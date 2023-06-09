import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Kafrex NFT Collection', () => { 
    const deployNFTCollection = async () => {
        const KafToken = await ethers.getContractFactory("KafToken")
        const kafToken = await KafToken.deploy()
        await kafToken.deployed();
        
        const NFTColl = await ethers.getContractFactory("NFTColl")
        const nftColl = await NFTColl.deploy(kafToken.address)
        await nftColl.deployed()

        const [owner, addr1, addr2] = await ethers.getSigners()
        
        return {kafToken, nftColl, owner, addr1, addr2}
    }

    describe("Deploy NFT Collection", () => {
        it("create a new NFT collection", async () => {
            const {kafToken, nftColl, owner, addr1, addr2} = await loadFixture(deployNFTCollection)

            await kafToken.mint(owner.address, "https://token-uri-1.com");
            const tokenID1 = await kafToken.getTokenID();

            await kafToken.mint(owner.address, "https://token-uri-2.com")
            const tokenID2 = await kafToken.getTokenID();

            await nftColl.addNFT(tokenID1)
            await nftColl.addNFT(tokenID2)
        })

        it("check transfer NFT", async () => {
            const {kafToken, nftColl, owner, addr1, addr2} = await loadFixture(deployNFTCollection)

            await kafToken.mint(owner.address, "https://token-uri-1.com");
            const tokenID1 = await kafToken.getTokenID();

            await kafToken.mint(owner.address, "https://token-uri-2.com")
            const tokenID2 = await kafToken.getTokenID();

            await nftColl.addNFT(tokenID1)
            await nftColl.addNFT(tokenID2)
            await nftColl.transferNFT(addr1.address, tokenID1)
            await nftColl.transferNFT(addr2.address, tokenID2)  
            expect(await kafToken.ownerOf(tokenID1)).to.equal(addr1.address);
            expect(await kafToken.ownerOf(tokenID2)).to.equal(addr2.address);
        })

        it("check transfer NFT count", async () => {
            const {kafToken, nftColl, owner, addr1, addr2} = await loadFixture(deployNFTCollection)

            await kafToken.mint(owner.address, "https://token-uri-1.com");
            const tokenID1 = await kafToken.getTokenID();

            await kafToken.mint(owner.address, "https://token-uri-2.com")
            const tokenID2 = await kafToken.getTokenID();

            await nftColl.addNFT(tokenID1)
            await nftColl.addNFT(tokenID2)
            await nftColl.transferNFT(addr1.address, tokenID1)
            await nftColl.transferNFT(addr2.address, tokenID2)  
            expect(await kafToken.ownerOf(tokenID1)).to.equal(addr1.address);
            expect(await kafToken.ownerOf(tokenID2)).to.equal(addr2.address);

            expect(await nftColl.getNFTCount()).to.equal(0);
        })

        it("check transfer NFT link", async () => {
            const {kafToken, nftColl, owner, addr1, addr2} = await loadFixture(deployNFTCollection)

            await kafToken.mint(owner.address, "https://token-uri-1.com");
            const tokenID1 = await kafToken.getTokenID();

            await kafToken.mint(owner.address, "https://token-uri-2.com")
            const tokenID2 = await kafToken.getTokenID();

            await nftColl.addNFT(tokenID1)
            await nftColl.addNFT(tokenID2)
            await nftColl.transferNFT(addr1.address, tokenID1)
            await nftColl.transferNFT(addr2.address, tokenID2)  
            expect(await kafToken.tokenURI(tokenID1)).to.equal("https://token-uri-1.com");
            expect(await kafToken.tokenURI(tokenID2)).to.equal("https://token-uri-2.com");

            expect(await nftColl.getNFTCount()).to.equal(0);
        })
    })
})