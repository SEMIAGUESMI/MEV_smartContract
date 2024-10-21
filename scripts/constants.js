/*Tcoin
const abiTcoin = require ("../ignition/deployments/chain-11155111/artifacts/TCOIN#TCOIN.json");
const TCOINAddress = "0xF91FD5C3ea4a711cd091c36c0d9416a1214473EB";
const TCOINABI = abiTcoin.abi;

//AMM
const abiAmm = require ( "../ignition/deployments/chain-11155111/artifacts/AMM#AMM.json");
const AMMaddress= "0x2fb7F1d67576a542895C0CCb1C2EA0ae6368E784";
const AMMABI = abiAmm.abi;

*/
//bet
const abiBet = require("../ignition/deployments/chain-11155111/artifacts/contractB#contractB.json");
const BETaddress = "0x6fA636045423A7273f461cdDB3D37bEDe82B8FCb";
const BETABI = abiBet.abi;

//bet
const abioracle= require("../ignition/deployments/chain-11155111/artifacts/oracle#oracle.json");
//const oracleaddress = "0x5F78BfA1cd3713B87819B604d0b9Bb01516f28a3";
const oracleaddress = "0x208FB782bcf8731453cFc4726b8C26a7befE7934";

const ORACLEABI = abioracle.abi;

module.exports = {
  oracleaddress,
  ORACLEABI,
 // AMMaddress,
 // AMMABI,
  //TCOINAddress,
 // TCOINABI

};


