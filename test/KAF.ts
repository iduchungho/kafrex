import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe("Kafrex Token", ()=>{
    const deployToken = async () => {
        const Kaf = await ethers.getContractFactory("KAF")
        const kaf = await Kaf.deploy();
        await kaf.deployed();
        const [sender, receiver] = await ethers.getSigners();
        return {sender, receiver, kaf}
    }

    describe("deploy KAF token", () => {
        it("should mint a new token", async ()=> {
            const {sender, receiver, kaf} = await loadFixture(deployToken);
            await kaf.mint(10000)
            expect(await kaf.totalSupply()).to.equal(10000);
        })

        it("should transfer token", async ()=> {
            const {sender, receiver, kaf} = await loadFixture(deployToken);
            await kaf.mint(10000)

            await kaf.transfer(receiver.address, 1000)
            expect(await kaf.totalSupply()).to.equal(10000);
            expect(await kaf.balanceOf(sender.address)).to.equal(10000 - 1000);
            expect(await kaf.balanceOf(receiver.address)).to.equal(1000);
            expect(await kaf.totalSupply()).to.equal(10000);
        })
    })
})