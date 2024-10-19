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

    console.log("rate ether", parseFloat((await AMMContract.getRate("ether")).toString())/10**12);
    console.log("rate usdc", parseFloat((await AMMContract.getRate("usdc")).toString())/10**12);
})();