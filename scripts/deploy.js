require('dotenv').config();
const { ethers } = require('ethers');
const BETABI= require('../artifacts/contracts/Bet.sol/Bet.json');

async function main() {
  
  const alchemy = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET, alchemy);


  const BetContractFactory = new ethers.ContractFactory(BETABI.abi, BETABI.bytecode, wallet);

  const humanReadableDate = "21 October 2024 23:00:00"; 
  const timestamp = Math.floor(new Date(humanReadableDate).getTime() / 1000);
  const balance = await wallet.getBalance();
console.log("Wallet balance on Sepolia in ETH:", ethers.utils.formatEther(balance));


  const gasLimit = 3000000;
  const bet = await BetContractFactory.deploy(
    "0xb24Ed7B2ac8Cb2a03d0E240E5a3bFE800AA3cee5", 
    "0x95F28298c6587bbd1f2A6Af3D72b5eCA41Bab24b", 
    2, 
    timestamp, 
    { value: ethers.utils.parseEther("0.0001") , gasLimit: gasLimit}  
  )
  console.log("Bet contract deployed at:", bet.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
