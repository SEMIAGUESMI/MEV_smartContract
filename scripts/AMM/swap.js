const {ethers} = require('ethers');
require('dotenv').config({ path: '../.env' });

const {AMMaddress, AMMABI} = require ('../constants.js');

const getEthereumContract =(address, abi, signer)=>{
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
    }
    
(async ()=> {
    const alchemy= new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
    const player = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2, alchemy);
    const AMMContract=  getEthereumContract(AMMaddress,AMMABI,player);


    let balanceAMMInEther1 = await alchemy.getBalance(AMMContract.address);
    let balanceAMMInEther_tcoinvalue1 = await AMMContract.getBalanceOfERC20(AMMContract.address);
    let balanceAmmInEther_ethValue1 = ethers.utils.formatEther(balanceAMMInEther1);

    console.log(`Balance of AMM on eth before add swap : ${balanceAmmInEther_ethValue1} ETH`);
    console.log(`Balance of AMM on tcoin before add swap: ${balanceAMMInEther_tcoinvalue1} TCOIN`);

    const valueInWei = ethers.utils.parseUnits("0.0003", "ether");
    const txSwap = await AMMContract.connect(player).swap(0, {value :valueInWei}); 
    await txSwap.wait(); 
    console.log(txSwap);

    console.log('valamount' , (await AMMContract.valamount()).toString());
    console.log('initialbalancEether' , (await AMMContract.initialbalancEether()).toString());
    console.log('initialbalanceToken' , (await AMMContract.initialbalanceToken()).toString());
    console.log('k' , (await AMMContract.k()).toString());
    console.log('_ExpBalanceEther' , (await AMMContract._ExpBalanceEther()).toString());
    
    console.log('_ExpBalanceToken' , (await AMMContract._ExpBalanceToken()).toString());
    console.log('valuetotransfer' , (await AMMContract._valueToTransfer())/10**6);


    let balanceAMMInEther = await alchemy.getBalance(AMMContract.address);
    let balanceAMMInEther_tcoinvalue = await AMMContract.getBalanceOfERC20(AMMContract.address);
    let balanceAmmInEther_ethValue = ethers.utils.formatEther(balanceAMMInEther);
    console.log(`Balance of AMM on eth after swap: ${balanceAmmInEther_ethValue} ETH`);
    console.log(`Balance of AMM on tcoin after swap: ${balanceAMMInEther_tcoinvalue} TCOIN`);
})();