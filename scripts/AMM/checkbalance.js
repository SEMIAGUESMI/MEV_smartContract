const {ethers} = require('ethers');
require('dotenv').config({ path: '../.env' });

const {AMMaddress, AMMABI,TCOINAddress, TCOINABI} = require ('../constants.js');
const getEthereumContract =(address, abi, signer)=>{
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
    }
(async ()=> {
    const alchemy= new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
    const userADDliq= new ethers.Wallet(process.env.PRIVATE_KEY_WALLET, alchemy);
    const AMMContract=  getEthereumContract(AMMaddress,AMMABI,userADDliq);

    let balanceAMMInEther = await alchemy.getBalance(AMMContract.address);
    let balanceAMMInEther_tcoinvalue = await AMMContract.getBalanceOfERC20(AMMContract.address);
    let balanceAmmInEther_ethValue = ethers.utils.formatEther(balanceAMMInEther);
    console.log(`Balance of AMM on eth : ${balanceAmmInEther_ethValue} ETH`);
    console.log(`Balance of AMM on wei : ${balanceAMMInEther} WEI`);
    console.log(`Balance of AMM on tcoin : ${balanceAMMInEther_tcoinvalue/10**6} TCOIN`);
    console.log(`Balance of AMM on ttcoin : ${balanceAMMInEther_tcoinvalue} TTCOIN`);


})();



