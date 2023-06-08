import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Kafrex NFT Collection', () => { 
    const deployNFTCollection = async () => {
        const KafToken = await ethers.getContractFactory("KafToken")
        const KafNFTColl = await ethers.getContractFactory("KafrexNFTCollection")
        const kafToken = await KafToken.deploy()
        await kafToken.deployed();

        const kafNFTColl = await KafNFTColl.deploy(kafToken.address)
        kafNFTColl.deployed()
        const [owner, addr1, addr2] = await ethers.getSigners()
        return {kafToken, kafNFTColl, owner, addr1, addr2}
    }

    describe("Deploy NFT Collection", () => {
        it("should create a new NFT collection", async () => {
            const {kafToken, kafNFTColl, owner, addr1, addr2} = await loadFixture(deployNFTCollection)
            await kafToken.awardItem(addr1.address, "https://token-uri.com");
            await kafToken.awardItem(addr2.address, "https://token-uri.com")
            const tokenID1 = await kafToken.getTokenID();

            await kafToken.connect(owner).transferFrom(addr1.address, kafNFTColl.address, tokenID1)
        })
    })
})