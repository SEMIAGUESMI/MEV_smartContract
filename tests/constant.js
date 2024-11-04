//TCOIN
const deployedTcoinJson = require("../ignition/deployments/chain-11155111/artifacts/TCOIN#TCOIN.json");
const tcoinAddress = "TCOIN-ADDRESS";
const tcoinAbi = deployedTcoinJson.abi;

//AMM
const deployedAmmJson = require("../ignition/deployments/chain-11155111/artifacts/AMM#AMM.json");
const ammAddress = "AMM-ADDRESS";
const ammAbi = deployedAmmJson.abi;

//Bet
const deployedBetJson = require("../ignition/deployments/chain-11155111/artifacts/Bet#Bet.json");
const betAddress = "BET-ADDRESS";
const betAbi = deployedBetJson.abi;

module.exports = {
    tcoinAddress,
    tcoinAbi,
    ammAddress,
    ammAbi,
    betAddress,
    betAbi
};


