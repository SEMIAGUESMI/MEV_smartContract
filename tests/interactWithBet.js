const { ethers } = require('ethers');
console.log(ethers.version);
require('dotenv').config();

const { betAddress, betAbi } = require('./constant');

const GETDATE = (date1) => {
    const date = new Date(date1 * 1000);
    return date.toString();
}
const getEthereumContract = (address, abi, signer) => {
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
}
(async () => {

    const alchemy = ethers.getDefaultProvider('sepolia', { alchemy: process.env.ALCHEMY_API_KEY, });
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET);
    const connectedWallet = signer.connect(alchemy);
    const Betcontract = getEthereumContract(betAddress, betAbi, connectedWallet);
    // ******************************call Bet********************************//
    
    let valueInWei = ethers.parseUnits("0.0000001", "ether");
    const valueInbigInt = BigInt(valueInWei);
    console.log(`Value in Wei (BigNumber): ${valueInbigInt}`);
    try {
        const transaction = await Betcontract.bet({ value: valueInbigInt });
        console.log('transaction sent', transaction);
        const txReceipt = await alchemy.waitForTransaction(
            transaction.hash
        );
        console.log(txReceipt);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }



    // ******************************call Win********************************//
   
    try {
        const transaction = await Betcontract.win();
        console.log('transaction sent', transaction);
        const txReceipt = await alchemy.waitForTransaction(
          transaction.hash
        );
        console.log(txReceipt);
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
})();