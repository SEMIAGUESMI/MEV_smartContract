const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AMM", (m) => {
    const tokenaddress= "0xF91FD5C3ea4a711cd091c36c0d9416a1214473EB";
  const ammContract = m.contract("AMM", [tokenaddress]);
  return { ammaddress: ammContract.address };  
});