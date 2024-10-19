
const {ethers} = require("hardhat");
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

function convertDateToTimestamp(dateString) {
  const date = new Date(dateString);
  const timestamp = Math.floor(date.getTime() / 1000); // Convert to seconds
  return timestamp;
}
module.exports = buildModule("contractB", (m) => {
  const humanReadableDate = "28 october 2024 23:00:00"; // Example date
  const timestamp1= convertDateToTimestamp(humanReadableDate);

  const valueInWei = ethers.parseUnits("0.0000001", "ether");
  const val= BigInt(valueInWei);

console.log(val);
const contractoracleaddress = "0x447Fd5eC2D383091C22B8549cb231a3bAD6d3fAf";
const LINKaddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
const jobID= "ca98366cc7314957b8c012c72f05aeeb"

const contractB = m.contract("contractB", ["0xb24Ed7B2ac8Cb2a03d0E240E5a3bFE800AA3cee5", "0x95F28298c6587bbd1f2A6Af3D72b5eCA41Bab24b", 2, timestamp1]);


return { contractBaddress: contractB.address };  
});