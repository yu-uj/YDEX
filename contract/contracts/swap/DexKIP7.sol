// SPDX-License-Identifier: GPL-3.0
pragma solidity =0.8.12;

import "../interfaces/IDexKIP7.sol";
import "../interfaces/IKIPReciever.sol";
import "../utils/Address.sol";
import "../utils/KIP13.sol";

contract DexKIP7 is IDexKIP7, KIP13 {
    using Address for address;

    string public name;
    string public constant symbol = "YDEX-LP";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Equals to `bytes4(keccak256("onKIP7Received(address,address,uint256,bytes)"))`
    // which can be also obtained as `IKIP7Receiver(0).onKIP7Received.selector`
    bytes4 private constant _KIP7_RECEIVED = 0x9d188c22;

    bytes32 public immutable DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH =
        0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
    mapping(address => uint256) public nonces;

    constructor() {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes(name)),
                keccak256(bytes("1")),
                chainId,
                address(this)
            )
        );
    }

    /**
     * @dev See {IKIP13-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IKIP13, KIP13)
        returns (bool)
    {
        return
            interfaceId == type(IKIP7).interfaceId ||
            interfaceId == type(IKIP7Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /** @dev Creates `amount` tokens and assigns them to `to` address, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     * @param to The address to assign the newly created tokens to. Should not be 0, so
       should be called from a contract which performs important safety checks
     * @param amount The amount of tokens to create.  
     */
    function _mint(address to, uint256 amount) internal {
        totalSupply = totalSupply + amount;
        balanceOf[to] = balanceOf[to] + amount;
        emit Transfer(address(0), to, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `from` address, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * @param from The address to destroy tokens from. Should not be used with address(0)
     * and must have at least `amount` tokens, so should be called from a contract which performs important safety checks
     * @param amount The amount to destroy tokens from `from` address.
     */
    function _burn(address from, uint256 amount) internal {
        balanceOf[from] = balanceOf[from] - amount;
        totalSupply = totalSupply - amount;
        emit Transfer(from, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements to check:
     *
     * - `owner` should not be the zero address.
     * - `spender` should not be the zero address.
     * @param owner The address which owns the tokens to approve.
     * @param spender The address which is allowed to spend the tokens.
     * @param amount The amount of tokens to allow `spender` to spend.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) private {
        allowance[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Moves `amount` of tokens from `from` to `to` address.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements to check:
     *
     * - `from` should not be the zero address.
     * - `to` should not be the zero address.
     * - `from` must have a balance of at least `amount`.
     */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) private {
        uint256 fromBalance = balanceOf[from];
        require(fromBalance >= amount, "KIP7: transfer amount exceeds balance");
        unchecked {
            balanceOf[from] = fromBalance - amount;
        }
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }

    /**
     * @dev See {IKIP7-approve}.
     *
     * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) external returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool) {
        uint256 currentAllowance = allowance[from][msg.sender];
        if (currentAllowance != type(uint256).max) {
            allowance[from][msg.sender] = currentAllowance - amount;
        }
        _transfer(from, to, amount);
        return true;
    }

    /**
     * @dev  Moves `amount` tokens from the caller's account to `recipient`.
     */
    function safeTransfer(address recipient, uint256 amount) external {
        safeTransfer(recipient, amount, "");
    }

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     */
    function safeTransfer(
        address recipient,
        uint256 amount,
        bytes memory data
    ) public {
        require(recipient != address(0), "KIP7: transfer to the zero address");
        _transfer(msg.sender, recipient, amount);
        require(
            _checkOnKIP7Received(msg.sender, recipient, amount, data),
            "KIP7: transfer to non KIP7Receiver implementer"
        );
    }

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism.
     * `amount` is then deducted from the caller's allowance.
     */
    function safeTransferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external {
        safeTransferFrom(sender, recipient, amount, "");
    }

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism.
     * `amount` is then deducted from the caller's allowance.
     */
    function safeTransferFrom(
        address sender,
        address recipient,
        uint256 amount,
        bytes memory data
    ) public {
        require(sender != address(0), "KIP7: transfer from the zero address");
        require(recipient != address(0), "KIP7: transfer to the zero address");

        uint256 currentAllowance = allowance[sender][msg.sender];
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "KIP7: insufficient allowance");
            allowance[sender][msg.sender] = currentAllowance - amount;
        }
        _transfer(sender, recipient, amount);
        require(
            _checkOnKIP7Received(sender, recipient, amount, data),
            "KIP7: transfer to non KIP7Receiver implementer"
        );
    }

    /**
     * @dev See {IKIP7Permit-permit}.
     * Sets `value` as the allowance of `spender` over ``owner``'s tokens,
     * given ``owner``'s signed approval.
     *
     * IMPORTANT: The same issues {IKIP7-approve} has related to transaction
     * ordering also apply here.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `deadline` must be a timestamp in the future.
     * - `v`, `r` and `s` must be a valid `secp256k1` signature from `owner`
     * over the EIP712-formatted function arguments.
     * - the signature must use ``owner``'s current nonce (see {nonces}).
     *
     * For more information on the signature format, see the
     * https://eips.ethereum.org/EIPS/eip-2612#specification[relevant EIP
     * section].
     */
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(deadline >= block.timestamp, "DEX: EXPIRED");
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        PERMIT_TYPEHASH,
                        owner,
                        spender,
                        value,
                        nonces[owner]++,
                        deadline
                    )
                )
            )
        );
        address recoveredAddress = ecrecover(digest, v, r, s);
        require(
            recoveredAddress != address(0) && recoveredAddress == owner,
            "DEX: INVALID_SIGNATURE"
        );
        _approve(owner, spender, value);
    }

    /**
     * @dev Internal function to invoke `onKIP7Received` on a target address.
     * The call is not executed if the target address is not a contract.
     */
    function _checkOnKIP7Received(
        address sender,
        address recipient,
        uint256 amount,
        bytes memory _data
    ) internal returns (bool) {
        if (!recipient.isContract()) {
            return true;
        }

        bytes4 retval = IKIP7TokenReceiver(recipient).onKIP7Received(
            msg.sender,
            sender,
            amount,
            _data
        );
        return (retval == _KIP7_RECEIVED);
    }
}
