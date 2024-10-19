const {ethers} = require ('ethers');
require('dotenv').config({ path: '../.env' });

const { BETABI, BETaddress } = require('../constants');
const {AMMaddress, AMMABI} = require ('../constants.js');


const getEthereumContract =(address, abi, signer)=>{
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
    }
(async () => {
   const alchemy = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
   const player = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2, alchemy);
   const contractBet = getEthereumContract(BETaddress, BETABI, player );
   const AMMContract=  getEthereumContract(AMMaddress,AMMABI,player);

   try {
    const valueInWei = ethers.utils.parseUnits("0.0000001", "ether");
    const txSwap1 = await AMMContract.connect(player).swap(0, {value :valueInWei}); 
    await txSwap1.wait(); 
    
    let valueInWei3 = ethers.utils.parseUnits("0.0001", "ether");
    const valueInbigInt= BigInt(valueInWei3);
    const txBet= await contractBet.connect(player).bet({value:valueInbigInt});
    txBet.wait();

    const valueInWei2 = ethers.utils.parseUnits("0.0000002", "ether");
    const txSwap2 = await AMMContract.connect(player).swap(0, {value :valueInWei2}); 
    await txSwap2.wait(); 

    console.log("tx swap 1", await txSwap1.hash)
    console.log("tx bet", await txBet.hash)
    console.log("tx swap 2",await txSwap2.hash)
    
  
} catch (error) {
    console.error('Error sending transaction:', error);
}

})();