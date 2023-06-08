import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `${process.env.URL}`,
      accounts: process.env.PRIVATE_KEY?.split(',')
    }
  }
};

export default config;
