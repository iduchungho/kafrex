// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./KAFNFT.sol";
import "hardhat/console.sol";

contract NFTColl {
    KAFNFT private kafnfts;
    mapping (uint256 => address) private nfts;

    event Transfer(address indexed from, address indexed to, uint256 tokenID);

    constructor(address myNFTAddress){
        kafnfts = KAFNFT(myNFTAddress);
    }

    function addNFT(uint256 tokenID) public {
        require(kafnfts.ownerOf(tokenID) == msg.sender, "addNFT: You don't own this NFT");
        nfts[tokenID] = kafnfts.ownerOf(tokenID);
    }

    function getOwnerOf(uint256 tokenID) public view returns(address) {
        return nfts[tokenID];
    }

    function transfer(address to, uint256 tokenID) public {
        require(kafnfts.ownerOf(tokenID) == msg.sender, "transfer: You don't own this NFT");
        kafnfts.transfer(msg.sender, to, tokenID);
        nfts[tokenID] = kafnfts.ownerOf(tokenID);
        emit Transfer(msg.sender, to, tokenID);
    }

}
