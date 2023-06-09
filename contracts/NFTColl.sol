// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./KafToken.sol";
import "hardhat/console.sol";

contract NFTColl {
    struct NFT {
        uint256 tokenID;
    }
    KafToken private kafToken;
    NFT[] private nfts;
    address private owner;

    event Transfer(address indexed from, address indexed to, uint256 tokenID);

    constructor(address myNFTAddress){
        kafToken = KafToken(myNFTAddress);
        owner = msg.sender;
    }

    function addNFT(uint256 tokenID) public {
        require(kafToken.ownerOf(tokenID) == msg.sender, "You don't own this NFT");
        nfts.push(NFT(tokenID));
    }
    
    function getNFTCount() public view returns(uint256){
        return nfts.length;
    }

    function transferNFT(address to, uint256 tokenID) public {
        require(kafToken.ownerOf(tokenID) == msg.sender, "You don't own this NFT");
        uint256 target = 0;
        for (uint256 i = 0 ; i < nfts.length; i++){
            if (nfts[i].tokenID == tokenID){
                target = i;
            }
        }
        for(uint256 i = target; i < nfts.length - 1; i++){
            nfts[i] = nfts[i + 1];
        }
        nfts.pop();
        kafToken.transfer(msg.sender, to, tokenID);
        emit Transfer(msg.sender, to, tokenID);
    }

    function getOwnerOfIdx(uint256 index) public view returns(address) {
        return kafToken.ownerOf(nfts[index].tokenID);
    }

    function getNFTs() public view returns(NFT[] memory){
        return nfts;
    }
}
