const {ethers} = require ('ethers');
require ('dotenv').config();

const { BETABI, BETaddress } = require('./constants');

const getEthereumContract =(address, abi, signer)=>{
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
    }
(async () => {
   const alchemy = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
   const samia = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2, alchemy);
   const contractBet = getEthereumContract(BETaddress, BETABI, samia );
   
   // const currentBlockNumber = await alchemy.getBlockNumber('latest');

   // const tx2= await contractBet.connect(samia).setTxHashBet("0xe25c3a23488dc68d79b21436505ff4814f5507c58a7a5c106635dff959efc5b1") ;  
   // const txReceipt = await alchemy.waitForTransaction( tx2.hash);
    //console.log(txReceipt);

    //console.log('txHashBetFunction bet', (await contractBet.txHashBetFunction()).toString());


    const tx3= await contractBet.connect(samia).win() ;  
    const txReceipt3 = await alchemy.waitForTransaction( tx3.hash);
    console.log(txReceipt3);


})();