const {ethers} = require('ethers');
require('dotenv').config();

const {AMMaddress, AMMABI,TCOINAddress, TCOINABI} = require ('./constants.js');

const getEthereumContract =(address, abi, signer)=>{
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
    }
    
(async ()=> {
    const alchemy= new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
    const userADDliq= new ethers.Wallet(process.env.PRIVATE_KEY_WALLET, alchemy);
    const AMMContract=  getEthereumContract(AMMaddress,AMMABI,userADDliq);
    
    const valueInWei = ethers.utils.parseUnits("0.0003", "ether");
    console.log(valueInWei.toString());
    const val= BigInt(valueInWei);
    console.log(val);

    const txgetTokenToTransfer = await AMMContract.get_valueTokenToTransfer(val); 
    await txgetTokenToTransfer.wait(); 
    console.log(txgetTokenToTransfer);

    console.log('valamount' , (await AMMContract.valamount()).toString());
    console.log('initialbalancEether' , (await AMMContract.initialbalancEether()).toString());
    console.log('initialbalanceToken' , (await AMMContract.initialbalanceToken()).toString());
    console.log('k' , (await AMMContract.k()).toString());
    console.log('_ExpBalanceEther' , (await AMMContract._ExpBalanceEther()).toString());
    console.log('_ExpBalanceToken' , (await AMMContract._ExpBalanceToken()).toString());
    console.log('_ExpBalanceToken' , (await AMMContract._valueToTransfer())/10**6);


 /*
 const valueInWei = ethers.utils.parseUnits("0.0006", "ether");
 const val= BigInt(valueInWei);
 console.log('x', val);
 const K=6*10**15 * 6*10**8;
 console.log('K', K)
 const X = 600000000000000 + (0.0003*(10**18));
 console.log('X', X);
 const Y = K / X;
 console.log(Y);
 console.log(Y/10**6);
 */
})();