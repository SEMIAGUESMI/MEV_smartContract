
//TCOIN
const abiTcoin = require("../ignition/deployments/chain-11155111/artifacts/TCOIN#TCOIN.json");
const TCOINAddress = "0xF91FD5C3ea4a711cd091c36c0d9416a1214473EB";
const TCOINABI = abiTcoin.abi;

//AMM
const abiAmm = require("../ignition/deployments/chain-11155111/artifacts/AMM#AMM.json");
const AMMaddress = "0x4bc72F76C1931EFa7A45Cf41b8ED07f3D28a23c9";
const AMMABI = abiAmm.abi;

//bet
const abiBet = require("../ignition/deployments/chain-11155111/artifacts/Bet#Bet.json");
const BETaddress = "0x9a35C4589d622429680a033A19511b1eC1862f8e";
const BETABI = abiBet.abi;

//API CONSUMER
const abiCONSUMER = require("../ignition/deployments/chain-11155111/artifacts/AMM#AMM.json");
const APICONSUMERaddress = "0xe278FAA56d73e251C86522b698fAc1661FEc8Be0";
const AMMCONSUMERABI = abiCONSUMER.abi;

module.exports = {
  AMMaddress,
  AMMABI,
  TCOINAddress,
  TCOINABI,
  BETaddress,
  BETABI
};


