
const { ethers } = require('ethers');

require ('dotenv').config();
const { ORACLEABI, oracleaddress } = require('./constants');

const getEthereumContract =(address, abi, signer)=>{
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
    }
(async () => {
    const alchemy = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
    const samia = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2);
const connectedWallet = samia.connect(alchemy);


  //const samia = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2, alchemy);
  
    
  const contractoracle = getEthereumContract(oracleaddress, ORACLEABI, connectedWallet );

try {
    const transaction= await contractoracle.requestGetData(68557780);
    console.log('transaction sent', transaction);
    const txReceipt = await alchemy.waitForTransaction(
        transaction.hash
      );
      console.log(txReceipt);
    } catch (error) {
    console.error('Error sending transaction:', error);
}
console.log('data', (await contractoracle.data()).toString());

})()