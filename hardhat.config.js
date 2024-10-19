require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/kMR6JD-NJGZWfK6a8AHuhzjzGomyxhOn", 
      accounts:["eee3326e1bf4eebbc9f9cce56564eee4640510a38d4262b4660a07169664bf54" ]
    }
    }
};
