import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('KafToken', () => { 
    const deployToken = async () => {
        const KafToken = await ethers.getContractFactory("KafToken");
        const kafToken = await KafToken.deploy()
        const [sender, receiver] = await ethers.getSigners();
        return {sender, receiver, kafToken}
    }

    describe("DeployToken", () => {
        it("Should mint a new token", async () => {
            const {sender, receiver, kafToken} = await loadFixture(deployToken);
            await kafToken.awardItem(sender.address, "https://token-uri.com");
            const tokenID = await kafToken.getTokenID();
            expect(await kafToken.ownerOf(tokenID)).to.equal(sender.address);
        })
    })
})