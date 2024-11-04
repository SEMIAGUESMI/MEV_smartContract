### Project description 
This project demonstrates a Betting contract that interacts with an Automated Market Maker (AMM) to get real-time token prices and uses [Chainlink](https://chain.link) oracles to fetch off-chain data in order to restrict MEV opportunities (front-running , back-running).

### Project Structure

```
├── README.md
├── contracts               #Contains Solidity smart contracts
├── hardhat.config.js       #Harthat configuration
├── ignition
│   └── modules             #JavaScript scripts for deploying smart contracts
├── package-lock.json
├── package.json
└── tests                   #JavaScript files for testing deployed smart contracts.
```

### Prerequisites

* YOUR-WALLET-PRIVATE-KEY: Ensure that you have a wallet (e.g Metamask) used to sign Blockchain transactions. To create a Metamask wallet 1. visit (https://metamask.io/(https://metamask.io/), 2. install MetaMask and add it's extension to your browser, 3. access to your wallet's `accounts details` 4. copy and past your wallet account private key in the hardhat.config.js `accounts:["YOUR-WALLET-PRIVATE-KEY"` and .env `PRIVATE_KEY_WALLET = YOUR-WALLET-PRIVATE-KEY` files.

* YOUR-PROVIDER_API_KEY: In this project we are using Alchemy, a blockchain infrastructure provider, to manage the interaction process with ethereum blockchain. To create Alchemy provider 1. go to [https://www.alchemy.com/](https://www.alchemy.com/) 2. click on "get your API key" 3. sign up 4. create an app, this will generate an Alchemy API key 5. coppy the generated API key and past it in the hardhat.config.js `url: "https://eth-sepolia.g.alchemy.com/v2/YOUR-PROVIDER-API-KEY` and .env `ALCHEMY_API_KEY = https://eth-sepolia.g.alchemy.com/v2/YOUR-PROVIDER-API-KEY` files.

### Installation and Setup
1. Install Project Dependencies
    ```
    npm install
    ```
2. Configure the network (e.g., Sepolia testnet), signer account (`accounts:["YOUR-WALLET-PRIVATE-KEY"` ), and provider API key (`url: "https://eth-sepolia.g.alchemy.com/v2/YOUR-PROVIDER-API-KEY`) in the `hardhat.config.js` file 
3. Compile Smart Contracts
    ```
    npx hardhat compile
    ```
4. To enable successful deployment use Hardhat Ignition to deploy the contracts Tcoin, AMM, and Bet to a specified network:
    ```
    for name in Tcoin AMM Bet; do 
        npx hardhat ignition deploy ./ignition/modules/deploy${name}.js --network <network-name>;
    done
    ```
5. (_Optional_) For post-deployment testing, ensure that the network, signer accounts, and provider API keys are also set up in the `scripts/.env` file for easy access.

### Testing the Function `win()`

1. [Acquire](https://docs.chain.link/resources/acquire-link) [Link](https://docs.chain.link/resources/link-token-contracts) tokens in your wallet (e.g., MetaMask).
2. [Fund the bet contract](https://docs.chain.link/resources/fund-your-contract) with a sufficient amount of LINK to cover Chainlink oracle fees required for contract interactions, especially before calling the win function.
3. Execute the following command
    ```bash
    node tests/interactWithBet.js
    ```

Check the [testing guide](https://github.com/SEMIAGUESMI/MEV_Bet_Oracle/blob/master/docs/testing_guide.pdf) for more details. 
