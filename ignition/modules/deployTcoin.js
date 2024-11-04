const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TCOIN", (m) => {
  const tcoin = m.contract("TCOIN", []);
  return { tcoinAddress: tcoin.address };  
});

