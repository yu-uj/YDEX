//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.12;

import "@klaytn/contracts/KIP/token/KIP7/IKIP7.sol";
import "./interfaces/IPriceOracle.sol";

contract Bank {
    struct Account {
        // Note that token values have an 18 decimal precision
        uint256 deposit; // accumulated deposits made into the account
        uint256 interest; // accumulated interest
        uint256 lastInterestBlock; // block at which interest was last computed
    }
    // Event emitted when a user makes a deposit
    event Deposit(
        address indexed _from, // account of user who deposited
        address indexed token, // token that was deposited
        uint256 amount // amount of token that was deposited
    );

    // Event emitted when a user makes a withdrawal
    event Withdraw(
        address indexed _from, // account of user who withdrew funds
        address indexed token, // token that was withdrawn
        uint256 amount // amount of token that was withdrawn
    );
    // Event emitted when a user borrows funds
    event Borrow(
        address indexed _from, // account who borrowed the funds
        address indexed token, // token that was borrowed
        uint256 amount, // amount of token that was borrowed
        uint256 newCollateralRatio // collateral ratio for the account, after the borrow
    );
    // Event emitted when a user (partially) repays a loan
    event Repay(
        address indexed _from, // accout which repaid the loan
        address indexed token, // token that was borrowed and repaid
        uint256 remainingDebt // amount that still remains to be paid (including interest)
    );
    // Event emitted when a loan is liquidated
    event Liquidate(
        address indexed liquidator, // account which performs the liquidation
        address indexed accountLiquidated, // account which is liquidated
        address indexed collateralToken, // token which was used as collateral
        // for the loan (not the token borrowed)
        uint256 amountOfCollateral, // amount of collateral token which is sent to the liquidator
        uint256 amountSentBack // amount of borrowed token that is sent back to the
        // liquidator in case the amount that the liquidator
        // sent for liquidation was higher than the debt of the liquidated account
    );

    IKIP7 public YDEXT;
    IPriceOracle public priceOracle;

    address public constant ETHADDRESS =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    mapping(address => mapping(address => Account)) accounts;
    mapping(address => Account) loanAccount;

    constructor(IPriceOracle _priceOracle, IKIP7 _YDEXT) {
        YDEXT = _YDEXT;
        priceOracle = _priceOracle;
    }

    /**
     * The purpose of this function is to allow end-users to deposit a given
     * token amount into their bank account.
     * @param token - the address of the token to deposit. If this address is
     *                set to 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE then
     *                the token to deposit is ETH.
     * @param amount - the amount of the given token to deposit.
     * @return - true if the deposit was successful, otherwise revert.
     */
    function deposit(address token, uint256 amount)
        external
        payable
        returns (bool)
    {
        require(
            token == address(YDEXT) || token == ETHADDRESS,
            "token not supported"
        );

        if (accounts[msg.sender][token].deposit > 0) {
            _calculateInterest(token, msg.sender);
        } else {
            accounts[msg.sender][token].lastInterestBlock = block.number;
        }

        if (token == address(YDEXT)) {
            accounts[msg.sender][token].deposit += amount;
            YDEXT.transferFrom(msg.sender, address(this), amount);
        } else {
            accounts[msg.sender][token].deposit += msg.value;
        }

        emit Deposit(msg.sender, token, amount);

        return true;
    }

    /**
     * The purpose of this function is to allow end-users to withdraw a given
     * token amount from their bank account. Upon withdrawal, the user must
     * automatically receive a 3% interest rate per 100 blocks on their deposit.
     * @param token - the address of the token to withdraw. If this address is
     *                set to 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE then
     *                the token to withdraw is ETH.
     * @param amount - the amount of the given token to withdraw. If this param
     *                 is set to 0, then the maximum amount available in the
     *                 caller's account should be withdrawn.
     * @return - the amount that was withdrawn plus interest upon success,
     *           otherwise revert.
     */
    function withdraw(address token, uint256 amount)
        external
        returns (uint256)
    {
        require(
            token == address(YDEXT) || token == ETHADDRESS,
            "token not supported"
        );
        require(accounts[msg.sender][token].deposit > 0, "no balance");
        require(
            amount <= accounts[msg.sender][token].deposit,
            "amount exceeds balance"
        );

        _calculateInterest(token, msg.sender);

        uint256 transf = amount;
        if (amount == 0) {
            transf = accounts[msg.sender][token].deposit;
        }

        accounts[msg.sender][token].deposit -= transf;
        transf += accounts[msg.sender][token].interest;
        accounts[msg.sender][token].interest = 0;

        if (token == address(YDEXT)) {
            YDEXT.transfer(msg.sender, transf);
        } else {
            payable(msg.sender).transfer(transf);
        }
        emit Withdraw(msg.sender, token, transf);

        return transf;
    }

    /**
     * The purpose of this function is to allow users to borrow funds by using their
     * deposited funds as collateral. The minimum ratio of deposited funds over
     * borrowed funds must not be less than 150%.
     * @param token - the address of the token to borrow. This address must be
     *                set to 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE, otherwise
     *                the transaction must revert.
     * @param amount - the amount to borrow. If this amount is set to zero (0),
     *                 then the amount borrowed should be the maximum allowed,
     *                 while respecting the collateral ratio of 150%.
     * @return - the current collateral ratio.
     */
    function borrow(address token, uint256 amount) external returns (uint256) {
        require(
            accounts[msg.sender][address(YDEXT)].deposit > 0,
            "no collateral deposited"
        );

        uint256 amountToBorrow = amount;

        if (loanAccount[msg.sender].deposit > 0) {
            _calculateLoanInterest(msg.sender);
        } else {
            loanAccount[msg.sender].lastInterestBlock = block.number;
        }
        loanAccount[msg.sender].deposit += amountToBorrow;

        uint256 collateral = getCollateralRatio(token, msg.sender);

        require(collateral >= 15000, "borrow would exceed collateral ratio");
        payable(msg.sender).transfer(amountToBorrow);
        emit Borrow(msg.sender, token, amountToBorrow, collateral);

        return collateral;
    }

    /**
     * The purpose of this function is to allow users to repay their loans.
     * Loans can be repaid partially or entirely. When replaying a loan, an
     * interest payment is also required. The interest on a loan is equal to
     * 5% of the amount lent per 100 blocks. If the loan is repaid earlier,
     * or later then the interest should be proportional to the number of
     * blocks that the amount was borrowed for.
     * @param token - the address of the token to repay. If this address is
     *                set to 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE then
     *                the token is ETH.
     * @param amount - the amount to repay including the interest.
     * @return - the amount still left to pay for this loan, excluding interest.
     */
    function repay(address token, uint256 amount)
        external
        payable
        returns (uint256)
    {
        require(token == ETHADDRESS, "token not supported");
        require(loanAccount[msg.sender].deposit > 0, "nothing to repay");
        require(amount <= msg.value, "msg.value < amount to repay");
        _calculateLoanInterest(msg.sender);
        uint256 payment = msg.value;
        if (loanAccount[msg.sender].interest >= payment) {
            loanAccount[msg.sender].interest -= payment;
        } else {
            payment -= loanAccount[msg.sender].interest;
            loanAccount[msg.sender].interest = 0;
            if (loanAccount[msg.sender].deposit >= payment) {
                loanAccount[msg.sender].deposit -= payment;
            } else {
                loanAccount[msg.sender].deposit = 0;
                loanAccount[msg.sender].lastInterestBlock = 0;
            }
        }
        emit Repay(
            msg.sender,
            token,
            loanAccount[msg.sender].deposit + loanAccount[msg.sender].interest
        );

        return loanAccount[msg.sender].deposit;
    }

    /**
     * The purpose of this function is to allow so called keepers to collect bad
     * debt, that is in case the collateral ratio goes below 150% for any loan.
     * @param token - the address of the token used as collateral for the loan.
     * @param account - the account that took out the loan that is now undercollateralized.
     * @return - true if the liquidation was successful, otherwise revert.
     */
    function liquidate(address token, address account)
        external
        payable
        returns (bool)
    {
        require(token == address(YDEXT), "token not supported");
        require(account != msg.sender, "cannot liquidate own position");
        uint256 collateral = getCollateralRatio(token, account);
        require(collateral < 15000, "healty position");
        _calculateLoanInterest(account);
        uint256 totalDebt = loanAccount[account].deposit +
            loanAccount[account].interest;
        require(totalDebt <= msg.value, "insufficient ETH sent by liquidator");
        uint256 devolution = msg.value - totalDebt;
        loanAccount[account].deposit = 0;
        loanAccount[account].interest = 0;
        loanAccount[account].lastInterestBlock = 0;
        uint256 totalYDEXT = _balance(token, account);

        accounts[account][token].deposit = 0;
        accounts[account][token].interest = 0;
        accounts[account][token].lastInterestBlock = 0;
        YDEXT.transfer(msg.sender, totalYDEXT);
        payable(msg.sender).transfer(devolution);

        emit Liquidate(msg.sender, account, token, totalYDEXT, devolution);

        return true;
    }

    /**
     * The purpose of this function is to return the collateral ratio for any account.
     * The collateral ratio is computed as the value deposited divided by the value
     * borrowed. However, if no value is borrowed then the function should return
     * uint256 MAX_INT = type(uint256).max
     * @param token - the address of the deposited token used a collateral for the loan.
     * @param account - the account that took out the loan.
     * @return - the value of the collateral ratio with 2 percentage decimals, e.g. 1% = 100.
     *           If the account has no deposits for the given token then return zero (0).
     *           If the account has deposited token, but has not borrowed anything then
     *           return MAX_INT.
     */
    function getCollateralRatio(address token, address account)
        public
        view
        returns (uint256)
    {
        if (accounts[account][address(YDEXT)].deposit == 0) {
            return 0;
        }
        if (loanAccount[account].deposit == 0) {
            return type(uint256).max;
        }
        uint256 blocks = block.number - loanAccount[account].lastInterestBlock;
        uint256 interest = loanAccount[account].interest +
            (loanAccount[account].deposit * 5 * blocks) /
            10000;
        uint256 val = (_balance(address(YDEXT), account) *
            priceOracle.getVirtualPrice(address(YDEXT)) *
            10000) / (1 ether * (loanAccount[account].deposit + interest));
        return val;
    }

    /**
     * The purpose of this function is to return the balance that the caller
     * has in their own account for the given token (including interest).
     * @param token - the address of the token for which the balance is computed.
     * @return - the value of the caller's balance with interest, excluding debts.
     */
    function getBalance(address token) public view returns (uint256) {
        require(
            token == address(YDEXT) || token == ETHADDRESS,
            "token not supported"
        );

        uint256 balance = _balance(token, msg.sender);
        return balance;
        // uint blocks = block.number - accounts[msg.sender][token].lastInterestBlock;
        // uint interest = accounts[msg.sender][token].interest+accounts[msg.sender][token].deposit*3*blocks/10000;
        // return accounts[msg.sender][token].deposit+interest;
    }

    function repayKlayAmount() public view returns (uint256) {
        uint256 repayKlay = loanAccount[msg.sender].deposit;
        return repayKlay;
    }

    function myDeposit(address token) public view returns (uint256) {
        uint256 mydeposit = accounts[msg.sender][token].deposit;
        return mydeposit;
    }

    function _balance(address token, address account)
        private
        view
        returns (uint256)
    {
        uint256 blocks = block.number -
            accounts[account][token].lastInterestBlock;
        uint256 interest = accounts[account][token].interest +
            (accounts[account][token].deposit * 3 * blocks) /
            10000;
        return accounts[account][token].deposit + interest;
    }

    function _calculateInterest(address token, address account) private {
        uint256 blocks = block.number -
            accounts[account][token].lastInterestBlock;
        accounts[account][token].interest +=
            (accounts[account][token].deposit * 3 * blocks) /
            10000;
        accounts[account][token].lastInterestBlock = block.number;
    }

    function _calculateLoanInterest(address account) private {
        uint256 blocks = block.number - loanAccount[account].lastInterestBlock;
        loanAccount[account].interest +=
            (loanAccount[account].deposit * 5 * blocks) /
            10000;
        loanAccount[account].lastInterestBlock = block.number;
    }
}
