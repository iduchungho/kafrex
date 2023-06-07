import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/dWn7XHJvfPEdyZf13fImQNkRQiguGQJe',
      accounts: ['7a08d40ef0ee5dc942225ca000eb4e21779df8644ba4962c7a01b3bb5477107f']
    }
  }
};

export default config;
