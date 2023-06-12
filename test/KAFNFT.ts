import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('KafNFT', () => { 
    const deployNFT = async () => {
        const KafNFT = await ethers.getContractFactory("KAFNFT");
        const kafNFT = await KafNFT.deploy()
        kafNFT.deployed()
        const [sender, receiver] = await ethers.getSigners();
        return {sender, receiver, kafNFT}
    }

    describe("Deploy NFT", () => {
        it("Should mint a new NFT", async () => {
            const {sender, receiver, kafNFT} = await loadFixture(deployNFT);
            await kafNFT.mint(sender.address, "https://token-uri.com");
            const tokenID = await kafNFT.getTokenID();
            expect(await kafNFT.ownerOf(tokenID)).to.equal(sender.address);
        })

        it("Should transfer a tokenID", async () => {
            const {sender, receiver, kafNFT} = await loadFixture(deployNFT);
            await kafNFT.mint(sender.address, "https://token-uri.com");
            const tokenID = await kafNFT.getTokenID();
            await kafNFT.transfer(sender.address, receiver.address, tokenID)
            expect(await kafNFT.ownerOf(tokenID)).to.equal(receiver.address);
        })
    })
})