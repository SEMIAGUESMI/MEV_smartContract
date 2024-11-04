const {ethers} = require("hardhat");
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

function convertDateToTimestamp(dateString) {
  const date = new Date(dateString);
  const timestamp = Math.floor(date.getTime() / 1000); // Convert to seconds
  return timestamp;
}
module.exports = buildModule("Bet", (m) => {
  const humanReadableDate = "31 october 2024 23:00:00"; 
  const timestamp1= convertDateToTimestamp(humanReadableDate);
  
  const oracle = m.contract("Bet", ["0x405F1371644897afB050829eea2A21a0FE430e50", "0x5276d12ffFaF205a1ef51e565CAfBFC046E5347D", 1, timestamp1]);
  return { contractaddress: oracle.address };  
});

