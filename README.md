This project is a smart contract implementation of an ERC20 token using Hardhat, OpenZeppelin, and Chainlink. The contract is deployed on the Ethereum Sepolia testnet, with Alchemy as the provider for the JSON-RPC interface. The project also includes unit tests using the Ethers.js library and dotenv for environment variables.

Prerequisites

Before you begin, ensure you have met the following requirements:

Node.js (v12.x or above)

Hardhat (npm install --save-dev hardhat) (https://hardhat.org/tutorial/creating-a-new-hardhat-project : tutorial to set up hardhat project)

Alchemy account (for API key and JSON-RPC provider) (https://www.alchemy.com/)

Chainlink library (https://github.com/smartcontractkit/chainlink) chainlink documentation (https://docs.chain.link/data-feeds)

Sepolia Testnet Ethereum account (for testnet deployment) 

Wallet: e.g MetaMask 

Install OpenZeppelin: npm install @openzeppelin/contracts //used for the creation of  ERC20 token "TCOIN"

Ethers.js for interacting with the Ethereum blockchain: npm install ethers

Dotenv for managing environment variables: npm install dotenv


hardhat command :

npx hardhat compile

npx hardhat ignition deploy ./ignition/modules/Lock.js network --sepolia (https://hardhat.org/tutorial/deploying-to-a-live-network)

npx hardhat help

npx hardhat test 

REPORT_GAS=true npx hardhat test

npx hardhat node



```
