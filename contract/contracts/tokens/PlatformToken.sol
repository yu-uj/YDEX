// SPDX-License-Identifier: GPL-3.0
pragma solidity =0.8.12;

import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "@klaytn/contracts/access/Ownable.sol";

contract PlatformToken is KIP7, Ownable {
<<<<<<< HEAD
    constructor() KIP7("YDEXTestToken", "YTDEX") {}
=======
    constructor() KIP7("JDEXToken", "JDEX") {
        _mint(msg.sender, 10000000 * 10**decimals());
    }
>>>>>>> team

    function mint(address account, uint256 amount) external returns (bool) {
        _mint(account, amount);
        return true;
    }

<<<<<<< HEAD
    function burn(address account, uint256 amount) external {
=======
    function burn(address account, uint256 amount) external onlyOwner {
>>>>>>> team
        _burn(account, amount);
    }

    function getChainId() external view returns (uint256) {
        return block.chainid;
    }
}
