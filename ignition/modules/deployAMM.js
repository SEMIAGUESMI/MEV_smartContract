const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AMM", (m) => {
    const tokenaddress= "0x5276d12ffFaF205a1ef51e565CAfBFC046E5347D"; // TCOIN address
  const ammContract = m.contract("AMM", [tokenaddress]);
  return { ammaddress: ammContract.address };  
});