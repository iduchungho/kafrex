import { ethers } from "hardhat";

async function main() {
  const KafToken = await ethers.getContractFactory("KafToken")
  const kafToken = await KafToken.deploy();
  await kafToken.deployed();

  const NFTColl = await ethers.getContractFactory("NFTColl")
  const nftColl = await NFTColl.deploy(kafToken.address)
  await nftColl.deployed()

  console.log("Token deployed to: ", kafToken.address)
  console.log("NFT Collection deployed to: ", nftColl.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
