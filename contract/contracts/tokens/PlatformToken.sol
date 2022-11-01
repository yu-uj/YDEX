// SPDX-License-Identifier: GPL-3.0
pragma solidity =0.8.12;

import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "@klaytn/contracts/access/Ownable.sol";

contract PlatformToken is KIP7, Ownable {
    constructor() KIP7("YDEXTestToken", "YTDEX") {}

    function mint(address account, uint256 amount) external returns (bool) {
        _mint(account, amount);
        return true;
    }

    function burn(address account, uint256 amount) external {
        _burn(account, amount);
    }

    function getChainId() external view returns (uint256) {
        return block.chainid;
    }
}
