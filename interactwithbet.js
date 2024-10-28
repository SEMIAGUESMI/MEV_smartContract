const { ethers } = require('ethers');
require('dotenv').config();

const { ORACLEABI, oracleaddress , APICONSUMERABI, APICONSUMERaddress} = require('./constants');
const getEthereumContract = (address, abi, signer) => {
  const TransactionContract = new ethers.Contract(address, abi, signer);
  return TransactionContract
}
const GETDATE = (date1) => {
  const date = new Date(date1 * 1000);
  return date.toString();
}

(async () => {
  // provider + accounts declaration
  const alchemy = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
  //const samia = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2, alchemy);
  const samia = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2);
  const connectedWallet = samia.connect(alchemy);
  const contractoracle = getEthereumContract(oracleaddress, ORACLEABI, connectedWallet);


  //test Bet() function 
  /*
  let valueInWei = ethers.utils.parseUnits("0.0000001", "ether");
  const valueInbigInt = BigInt(valueInWei);
  console.log(`Value in Wei (BigNumber): ${valueInbigInt}`);
    try {
      const transaction = await contractoracle.bet({ value: valueInbigInt });
      console.log('transaction sent', transaction);
      const txReceipt = await alchemy.waitForTransaction(
        transaction.hash
      );
      console.log(txReceipt);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
/*
    // test values variables after bet() execution
    console.log("player", await contractoracle.player());
    console.log('timestamp bet', (await contractoracle.timestampBet()).toString());
    console.log('blocknumber bet', (await contractoracle.blocknumber()).toString());
    let deadline = await contractoracle.deadline();
    let getCurrentTimestamp = await contractoracle.getCurrentTimestamp();
    console.log('deadline bet', deadline.toString());
    console.log('getCurrentTimestamp ', getCurrentTimestamp.toString());
    console.log('deadline bet UTC FORMAT', GETDATE(deadline));
    console.log('getCurrentTimestamp UTC FORMAT', GETDATE(getCurrentTimestamp));


    *///test win() function execution
 const tx3= await contractoracle.win({gasLimit :10000000}) ;  
 const txReceipt3 = await alchemy.waitForTransaction( tx3.hash);
  console.log(txReceipt3);
 // console.log('nbBackrunningTransaction', (await contractoracle.nbBackrunningTransaction()).toString()/10**18);
 // console.log('url request', (await contractoracle.getUrl()));
  /*
      //https://historicaltxalchemy.vercel.app/get-transfers?vercelToolbarCode=0Slkd77nik9k_Zu7&fromBlockUint=6929471&fromAddress=0xa350480f236e13199e3d502fa02d30dced968c2f&toAddress=0xb24ed7b2ac8cb2a03d0e240e5a3bfe800aa3cee5
      //https://historicaltxalchemy.vercel.app/get-transfers?vercelToolbarCode=0Slkd77nik9k_Zu7&fromBlockUint=6855778&fromAddress=0xCC76244a2f9591D7868Cd1a71994d05A12e1DfA5&toAddress=0x2fb7F1d67576a542895C0CCb1C2EA0ae6368E784
      https://historicaltxalc emy.vercel.app/get-transfers?vercelToolbarCode=0Slkd77nik9k_Zu7&fromBlockUint=6932259&fromAddress=0xa350480f236e13199e3d502fa02d30dced968c2f&toAddress=0xb327eb6e85d33d70b99917f79825eee4f1444656
    // oracle test
    console.log('data' (await contractoracle.nbBackrunningTransactioninFinalizefuncBegin()).toString() / 10 ** 18);
    /*
  try {
    const transaction =, await contractoracle.requestVolumeData();
    console.log('transaction sent', transaction);
    const txReceipt = await alchemy.waitForTransaction(
      transaction.hash
    );
    console.log(transaction);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
  console.log('data', (await contractoracle.nbBackrunningTransaction()));
*/
})()