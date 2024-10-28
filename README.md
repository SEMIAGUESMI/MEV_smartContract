### Project description 
This project demonstrates a Betting contract that interacts with an Automated Market Maker (AMM) to get real-time token prices and uses Chainlink oracles to fetch off-chain data in order to restrict MEV opportunities (front-running , back-running).

### Project structure 
[contracts](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/contracts): Contains Solidity smart contracts with Chainlink oracle integration.<br>
[contractsWithoutOracle](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/contractsWithoutOracle): Contains Solidity smart contracts without Chainlink oracle code.<br>
[ignition](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/ignition): Houses Hardhat Ignition modules, JavaScript functions used to define and structure deployment workflows, dependencies, and configurations. <br>
/ / [deployments](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/ignition/deployments): Stores deployment outputs. <br>
      [chain-11155111](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/ignition/deployments/chain-11155111): Deployment artifacts specific to chain ID 11155111. <br>
        [artifacts](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/ignition/deployments/chain-11155111/artifacts): Contains ABI and bytecode of deployed contracts in JSON format. <br>
        [build-info](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/ignition/deployments/chain-11155111/build-info): Provides deployed contract addresses and deployment logs. <br>
    [modules](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/ignition/modules): JavaScript scripts for deploying smart contracts. <br>
[scripts](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/scripts): JavaScript files for testing deployed smart contracts. <br>
    [AMM](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/scripts/AMM) : AMM contract scripts br>
    [BET](https://github.com/SEMIAGUESMI/MEV_smartContract/tree/main/scripts/BET) : Bet contract scripts <br>

### Installation and Setup
1. Install Project Dependencies: Install all dependencies listed in package.json:
```
npm install
```
2. Install Hardhat
```
npm install --save-dev hardhat
```
3. Initialize Hardhat Project
```
npx hardhat init
```
4. Install Hardhat Toolbox Plugin
Install `@nomicfoundation/hardhat-toolbox` for enhanced Hardhat features:
```
npm install --save-dev @nomicfoundation/hardhat-toolbox
```
4. Compile Smart Contracts
```
npx hardhat compile
```
5. Deploy Smart Contracts to a Live Network
Use Hardhat Ignition to deploy contracts to a specified network:
```
npx hardhat ignition deploy ./ignition/modules/Token.js --network <network-name>
```
###Required Packages

Install `openzeppelin/contracts` library
```
npm install @openzeppelin/contracts
```
Install `chainlink/contracts` library
```
npm install @chainlink/contracts --save
```
Install `` library
```
npm install ethers
```
Install `dotenv` library
```
npm install dotenv --save
```
Install `axios` library
```
npm install axios

```

###Configuration Prerequisites
1. Acquire and Fund with LINK ]Tokens
    * [Acquire](https://docs.chain.link/resources/acquire-link) (Link] (https://docs.chain.link/resources/link-token-contracts)tokens in your wallet (e.g., MetaMask).
    * [Fund the bet contract](https://docs.chain.link/resources/fund-your-contract) with a sufficient amount of LINK to cover Chainlink oracle fees required for contract interactions, especially before calling the win function.
2. Network and Account Configuration for Deployment
    * Configure the network (e.g., Sepolia testnet), signer accounts (private keys), and provider API key (e.g., Alchemy) in the `hardhat.config.js` file to enable successful deployment.
3. Environment Setup for Testing After Deployment
    * For post-deployment testing, ensure that the network, signer accounts, and provider API keys are also set up in the `.env` file for easy access and security.
