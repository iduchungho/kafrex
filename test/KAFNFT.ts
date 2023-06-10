import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('KafToken', () => { 
    const deployToken = async () => {
        const KafToken = await ethers.getContractFactory("KAFNFT");
        const kafToken = await KafToken.deploy()
        const [sender, receiver] = await ethers.getSigners();
        return {sender, receiver, kafToken}
    }

    describe("DeployToken", () => {
        it("Should mint a new token", async () => {
            const {sender, receiver, kafToken} = await loadFixture(deployToken);
            await kafToken.mint(sender.address, "https://token-uri.com");
            const tokenID = await kafToken.getTokenID();
            expect(await kafToken.ownerOf(tokenID)).to.equal(sender.address);
        })

        it("Should transfer a tokenID", async () => {
            const {sender, receiver, kafToken} = await loadFixture(deployToken);
            await kafToken.mint(sender.address, "https://token-uri.com");
            const tokenID = await kafToken.getTokenID();
            await kafToken.transfer(sender.address, receiver.address, tokenID)
            expect(await kafToken.ownerOf(tokenID)).to.equal(receiver.address);
        })
    })
})