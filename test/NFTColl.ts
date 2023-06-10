import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Kafrex NFT Collection', () => { 
    const deployNFTCollection = async () => {
        const KAFNFT = await ethers.getContractFactory("KAFNFT")
        const kafnft = await KAFNFT.deploy()
        await kafnft.deployed();
        
        const NFTColl = await ethers.getContractFactory("NFTColl")
        const nftColl = await NFTColl.deploy(kafnft.address)
        await nftColl.deployed()

        const [owner, addr1, addr2] = await ethers.getSigners()
        
        return {kafnft, nftColl, owner, addr1, addr2}
    }

    describe("Deploy NFT Collection", () => {
        it("create a new NFT collection", async () => {
            const {kafnft, nftColl, owner, addr1, addr2} = await loadFixture(deployNFTCollection)

            await kafnft.mint(owner.address, "https://token-uri-1.com");
            const tokenID1 = await kafnft.getTokenID();

            await kafnft.mint(owner.address, "https://token-uri-2.com")
            const tokenID2 = await kafnft.getTokenID();

            await nftColl.addNFT(tokenID1)
            await nftColl.addNFT(tokenID2)
        })

        it("check transfer NFT", async () => {
            const {kafnft, nftColl, owner, addr1, addr2} = await loadFixture(deployNFTCollection)

            await kafnft.mint(owner.address, "https://token-uri-1.com");
            const tokenID1 = await kafnft.getTokenID();

            await kafnft.mint(owner.address, "https://token-uri-2.com")
            const tokenID2 = await kafnft.getTokenID();

            await nftColl.addNFT(tokenID1)
            await nftColl.addNFT(tokenID2)

            // console.log("owner: ", owner.address)
            // console.log("addr1: ", addr1.address)
            // console.log("addr2: ", addr2.address)


            await nftColl.connect(owner).transfer(addr1.address, tokenID1)
            await nftColl.connect(owner).transfer(addr2.address, tokenID2)

            expect(await nftColl.getOwnerOf(tokenID1)).to.equal(addr1.address)
            expect(await nftColl.getOwnerOf(tokenID2)).to.equal(addr2.address)
        })

        it("check transfer NFT addr1 addr2", async () => {
            const {kafnft, nftColl, owner, addr1, addr2} = await loadFixture(deployNFTCollection)

            await kafnft.mint(addr1.address, "https://token-uri-1.com");
            const tokenID1 = await kafnft.getTokenID();

            await kafnft.mint(addr2.address, "https://token-uri-2.com")
            const tokenID2 = await kafnft.getTokenID();

            await nftColl.connect(addr1).addNFT(tokenID1)
            await nftColl.connect(addr2).addNFT(tokenID2)


            await nftColl.connect(addr1).transfer(owner.address, tokenID1)
            await nftColl.connect(addr2).transfer(addr1.address, tokenID2)

            expect(await nftColl.connect(owner).getOwnerOf(tokenID1)).to.equal(owner.address)
            expect(await nftColl.connect(addr1).getOwnerOf(tokenID2)).to.equal(addr1.address)
        })

        it("check transfer NFT link", async () => {
            const {kafnft, nftColl, owner, addr1, addr2} = await loadFixture(deployNFTCollection)

            await kafnft.mint(owner.address, "https://token-uri-1.com");
            const tokenID1 = await kafnft.getTokenID();

            await kafnft.mint(owner.address, "https://token-uri-2.com")
            const tokenID2 = await kafnft.getTokenID();

            await nftColl.addNFT(tokenID1)
            await nftColl.addNFT(tokenID2)
            await nftColl.transfer(addr1.address, tokenID1)
            await nftColl.transfer(addr2.address, tokenID2)  
            expect(await kafnft.tokenURI(tokenID1)).to.equal("https://token-uri-1.com");
            expect(await kafnft.tokenURI(tokenID2)).to.equal("https://token-uri-2.com");

        })
    })
})