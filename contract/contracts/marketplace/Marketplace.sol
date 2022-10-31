// SPDX-License-Identifier: MIT
pragma solidity =0.8.12;

import "./YDEXNFT.sol";
import "@klaytn/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    address payable public immutable feeAccount; // the account that receives fees
    uint256 public immutable feePercent; // the fee percentage on sales
    uint256 public itemCount;
    YDEXNFT nftCollection;

    struct Item {
        uint256 itemId;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool sold;
    }

    event Offered(
        uint256 itemId,
        uint256 tokenId,
        uint256 price,
        address indexed seller
    );

    event Bought(
        uint256 itemId,
        uint256 tokenId,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );

    mapping(uint256 => Item) public items;

    constructor(uint256 _feePercent, address _nftCollection) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
        nftCollection = YDEXNFT(_nftCollection);
    }

    function makeItem(uint256 _tokenId, uint256 _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;
        nftCollection.transferFrom(msg.sender, address(this), _tokenId);

        items[itemCount] = Item(
            itemCount,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );

        emit Offered(itemCount, _tokenId, _price, msg.sender);
    }

    function purchaseItem(uint256 _itemId) external payable nonReentrant {
        uint256 _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(
            msg.value >= _totalPrice,
            "Not enough klay to cover item price and market fee"
        );
        require(!item.sold, "item already sold");

        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);

        item.sold = true;

        nftCollection.transferFrom(address(this), msg.sender, item.tokenId);
        emit Bought(_itemId, item.tokenId, item.price, item.seller, msg.sender);
    }

    function getTotalPrice(uint256 _itemId) public view returns (uint256) {
        return (items[_itemId].price * (100 + feePercent / 100));
    }
}
