const { ethers } = require('ethers');
require('dotenv').config();

const { BETABI, BETaddress, APICONSUMERABI, APICONSUMERaddress } = require('./constants');
const getEthereumContract = (address, abi, signer) => {
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
}
const GETDATE = (date1) => {
    const date = new Date(date1 * 1000);
    return date.toString();
}

(async () => {
    const alchemy = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
    const samia = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2);
    const connectedWallet = samia.connect(alchemy);
    const contractoracle = getEthereumContract(BETaddress,BETABI, connectedWallet);

    //TEST BET() FUNCTION
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
    console.log("player", await contractoracle.player());
    console.log('timestamp bet', (await contractoracle.timestampBet()).toString());
    console.log('blocknumber bet', (await contractoracle.blocknumber()).toString());
    let deadline = await contractoracle.deadline();
    let getCurrentTimestamp = await contractoracle.getCurrentTimestamp();
    console.log('deadline bet', deadline.toString());
    console.log('getCurrentTimestamp ', getCurrentTimestamp.toString());
    console.log('deadline bet UTC FORMAT', GETDATE(deadline));
    console.log('getCurrentTimestamp UTC FORMAT', GETDATE(getCurrentTimestamp));

    //TEST WIN() FUNCTION
*/
    try {
        const transaction = await contractoracle.win();
        console.log('transaction sent', transaction);
        const txReceipt = await alchemy.waitForTransaction(
          transaction.hash
        );
        console.log(transaction);
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    console.log('contractAMM', (await contractoracle.contractAMM()));
    console.log('player', (await contractoracle.player()));
    console.log('blocknumber', (await contractoracle.blocknumber()).toString());
  
    console.log('address from in req', (await contractoracle.getadrfrom()));
    console.log('address to  in req', (await contractoracle.getadrto()));
    console.log('blocknumber in req', (await contractoracle.getfromblockk()));
  
    console.log('url API', (await contractoracle.getUrl()))

  
   console.log('nb', (await contractoracle.getdata()));

})();

