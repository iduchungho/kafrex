// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract KAFNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable private _sender;

    constructor() ERC721("Kafrexs", "KNT") {}

    event Transfers(address indexed sender, address indexed receiver, uint256);

    function mint(address player, string memory tokenURI) public {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
    }

    function getTokenID() public view returns (uint256) {
        return _tokenIds.current() - 1;
    }

    function transfer(address from, address to, uint256 tokenID) public {
        require(ownerOf(tokenID) == from, "You don't own this NFTs");
        _approve(msg.sender, tokenID);
        transferFrom(from, to, tokenID);
        emit Transfer(from, to, tokenID);
    }
}
