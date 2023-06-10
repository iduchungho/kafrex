import { ethers } from "hardhat";

async function main() {
  const KAFNFT = await ethers.getContractFactory("KAFNFT")
  const kafnft = await KAFNFT.deploy();
  await kafnft.deployed();

  const NFTColl = await ethers.getContractFactory("NFTColl")
  const nftColl = await NFTColl.deploy(kafnft.address)
  await nftColl.deployed()

  const KafToken = await ethers.getContractFactory("KAF")
  const kafToken = await KafToken.deploy()
  await kafToken.deployed()

  console.log("Token deployed to: ", kafToken.address)
  console.log("NFT Collection deployed to: ", nftColl.address)
  console.log("NFT deployed to: ", kafnft.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
