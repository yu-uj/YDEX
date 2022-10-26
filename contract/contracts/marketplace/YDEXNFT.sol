// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@klaytn/contracts/KIP/token/KIP7/IKIP7.sol";
import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17URIStorage.sol";

contract YDEXNFT is KIP17, Ownable, KIP17URIStorage {
    using Counters for Counters.Counter;
    IKIP7 public tokenAddress;
    uint256 public rate = 25 * 10 ** 18;

    Counters.Counter private _tokenIdCounter;

    constructor(address _tokenAddress) KIP17("YDEXNFT", "YNFT") {
        tokenAddress = IKIP7(_tokenAddress);
    }

    function safeMint(string memory uri) public {
        tokenAddress.transferFrom(msg.sender, address(this), rate);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function withdrawToken() public onlyOwner {
        tokenAddress.transfer(msg.sender, tokenAddress.balanceOf(address(this)));
    }
    function tokenURI(uint256 tokenId) public view override(KIP17, KIP17URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    function _burn(uint256 tokenId) internal override(KIP17, KIP17URIStorage) {
        super._burn(tokenId);
    }
}