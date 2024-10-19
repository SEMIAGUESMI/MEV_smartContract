const {ethers} = require("hardhat");
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("oracle", (m) => {
  const oracle = m.contract("oracle");
  return { contractaddress: oracle.address };  
});

