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
   
console.log('owner bet', await contractBet.owner());
console.log('contract bet address', contractBet.address );
console.log('player address', await contractBet.player());

 let balanceSamia = await alchemy.getBalance(samia.address);
 let balanceSamiaInEther = ethers.utils.formatEther(balanceSamia);

 let balanceBet = await alchemy.getBalance(contractBet.address);
 let balanceBetInEther = ethers.utils.formatEther(balanceBet);


 console.log(`Balance of Samia: ${balanceSamiaInEther} ETH`);
 console.log(`Balance of Bet: ${balanceBetInEther} ETH`);
// call bet function
 let valueInWei = ethers.utils.parseUnits("0.00000001", "ether");
 const valueInbigInt= BigInt(valueInWei);
 
 console.log(`Value in Wei (BigNumber): ${valueInbigInt}`);
 
try {
    const transaction= await contractBet.connect(samia).bet({value:valueInbigInt});
    console.log('transaction sent', transaction);
    const txReceipt = await alchemy.waitForTransaction(
        transaction.hash// Transaction hash of the transaction for which you want to get the information
      );
      console.log(txReceipt);
    } catch (error) {
    console.error('Error sending transaction:', error);
}

//console.log('contract bet address', contractBet.address );
 let balanceSamia2 = await alchemy.getBalance(samia.address);
 let balanceSamiaInEther2 = ethers.utils.formatEther(balanceSamia2);

 let balanceBet2 = await alchemy.getBalance(contractBet.address);
 let balanceBetInEther2 = ethers.utils.formatEther(balanceBet2);

 console.log(`Balance 2 of Samia: ${balanceSamiaInEther2} ETH`);
 console.log(`Balance 2 of Bet: ${balanceBetInEther2} ETH`);

 console.log("initialpot", (await contractBet.initialpot()).toString());
 console.log("player", await contractBet.player());

 //console.log('timestamp bet', (await contractBet.timestampBet()).toString());
 let deadline = await contractBet.deadline();
 let getCurrentTimestamp = await contractBet.getCurrentTimestamp();
 console.log('deadline bet', deadline.toString());
 console.log('getCurrentTimestamp ', getCurrentTimestamp.toString());
 
 console.log('blocknumber bet', (await contractBet.blocknumber()).toString());
 
const GETDATE =(date1)=>{
    const date = new Date(date1 * 1000); 
   return date.toString(); 
    }
 console.log('timestamp bet UTC FORMAT', GETDATE(deadline));
 console.log('getCurrentTimestamp UTC FORMAT', GETDATE(getCurrentTimestamp));



 "1729468800"
 //const timestampBet = (await contractBet.getCurrentTimestamp()).toString();
 //const date2 = new Date(timestampBet * 1000); // Convert seconds to milliseconds
 //console.log(date2.toUTCString()); // Prints the date in UTC format
 //console.log(date2.toString()); // Prints the date in local time format

   
})()