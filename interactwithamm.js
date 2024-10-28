const { ethers } = require('ethers');
require('dotenv').config();

const { AMMaddress, AMMABI,  TCOINAddress,TCOINABI } = require('./constants.js');

const getEthereumContract = (address, abi, signer) => {
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
}

(async () => {
    const alchemy = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
    const samia = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2, alchemy);
    const connectedWallet = samia.connect(alchemy);
    const AMMContract = getEthereumContract(AMMaddress, AMMABI, connectedWallet);
    const TCOINContract = getEthereumContract(TCOINAddress, TCOINABI, connectedWallet);
    //const player = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET_USER2, alchemy);

    // call getRate function

   // console.log("rate ether", parseFloat((await AMMContract.getRate("ether")).toString()) / 10 ** 12);
    //console.log("rate usdc", parseFloat((await AMMContract.getRate("usdc")).toString())/10**12);
    /*call swap function

    const etherAmount2 = ethers.utils.parseUnits("0.0003", "ether");
    const val = BigInt(etherAmount2);

    const txSwap = await AMMContract.connect(samia).swap(0, { value: val });
    await txSwap.wait();
    console.log(txSwap);
    receipt = null;
    while (receipt === null) {
        receipt = await alchemy.getTransactionReceipt(txSwap.hash);
        if (receipt === null) {
            console.log('Waiting for transaction to be mined...');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        }
    }
    console.log(receipt);
    console.log('Transaction Status:', receipt.status === 1 ? 'Success' : 'Failure');

    let balancePlayerInEther = await alchemy.getBalance(player.address);
    let balancePlayerInEther_ethValue = ethers.utils.formatEther(balancePlayerInEther);
    let balancePLAYERTcoinInEther_tcoinvalue = await AMMContract.getBalanceOfERC20(player.address);

    console.log(`Balance of PLAYER on eth : ${balancePlayerInEther_ethValue} ETH`);
    console.log(`Balance of PLAYER on TCOIN : ${balancePLAYERTcoinInEther_tcoinvalue} TCOIN`);



    let balanceAMMInEther = await alchemy.getBalance(AMMContract.address);
    let balanceAMMInEther_tcoinvalue = await AMMContract.getBalanceOfERC20(AMMContract.address);
    let balanceAmmInEther_ethValue = ethers.utils.formatEther(balanceAMMInEther);
    console.log(`Balance of AMM on eth : ${balanceAmmInEther_ethValue} ETH`);
    console.log(`Balance of AMM on tcoin: ${balanceAMMInEther_tcoinvalue} TCOIN`);

    let balanceAddLiqInEther = await alchemy.getBalance(userADDliq.address);
    let balanceAddLiqInEther_tcoinvalue = await AMMContract.getBalanceOfERC20(userADDliq.address);
    let balanceAddLiqInEther_ethValue = ethers.utils.formatEther(balanceAddLiqInEther);
    console.log(`Balance of UserAddLiq on eth : ${balanceAddLiqInEther_ethValue} ETH`);
    console.log(`Balance of UserAddLiq on tcoin: ${balanceAddLiqInEther_tcoinvalue} TCOIN`);

    
    let balancePlayerInEther = await alchemy.getBalance(player.address);
    let balancePlayerInEther_ethValue = ethers.utils.formatEther(balancePlayerInEther);

    console.log(`Balance of PLAYER on eth : ${balancePlayerInEther_ethValue} ETH`);
       
    // call addliquidity function
   
        const amountToApprove = ethers.utils.parseUnits("1", 6); // 600 tcoin
        const approveTx = await TCOINContract.connect(samia).approve(AMMContract.address, amountToApprove);
        await approveTx.wait(); // Wait for the transaction to be mined
        const allowanceValue = await TCOINContract.allowance(samia.address, AMMContract.address);
        console.log("Allowance Value:", ethers.utils.formatUnits(allowanceValue, 6)); // Convert from smallest units to tcoin
        
        const valueInWei = ethers.utils.parseUnits("0.0000001", "ether");
        const val= BigInt(valueInWei);
        console.log(val);
        const tx = await AMMContract.connect(samia).addLiquidity(amountToApprove, { value: val });
        await tx.wait(); 
    
    console.log(tx);
        receipt = null;
        while (receipt === null) {
            receipt = await alchemy.getTransactionReceipt('0x5a4055c3f1806bdd7559723740cabdeacfe42f96a3a07b8b4ff264b2169acf4e');
            if (receipt === null) {
                console.log('Waiting for transaction to be mined...');
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
            }
        }
        
        console.log(receipt);
        console.log('Transaction Status:', receipt.status === 1 ? 'Success' : 'Failure');
    
        let balanceAMMInEther = await alchemy.getBalance(AMMContract.address);
        let balanceAMMInEther_tcoinvalue = await AMMContract.getBalanceOfERC20(AMMContract.address);
        let balanceAmmInEther_ethValue = ethers.utils.formatEther(balanceAMMInEther);
        console.log(`Balance of AMM on eth : ${balanceAmmInEther_ethValue} ETH`);
        console.log(`Balance of AMM on tcoin: ${balanceAMMInEther_tcoinvalue/10**6} TCOIN`);
       
       // call getRate function
    
    console.log("rate ether", parseFloat((await AMMContract.getRate("ether")).toString())/10**12);
    //console.log("rate usdc", parseFloat((await AMMContract.getRate("usdc")).toString())/10**12);
    */
        //call swap true function
        
        const etherAmount2 = ethers.utils.parseUnits("0.0003", "ether");
        const val= BigInt(etherAmount2);
    
        const txSwap = await AMMContract.connect(samia).swap(0,{value:val} ); 
        await txSwap.wait(); 
        console.log(txSwap);
        receipt = null;
        while (receipt === null) {
            receipt = await alchemy.getTransactionReceipt(txSwap.hash);
            if (receipt === null) {
                console.log('Waiting for transaction to be mined...');
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
            }
        }
        console.log(receipt);
        console.log('Transaction Status:', receipt.status === 1 ? 'Success' : 'Failure');
    
        let balancePlayerInEther = await alchemy.getBalance(player.address);
        let balancePlayerInEther_ethValue = ethers.utils.formatEther(balancePlayerInEther);
        let balancePLAYERTcoinInEther_tcoinvalue = await AMMContract.getBalanceOfERC20(player.address);
    
        console.log(`Balance of PLAYER on eth : ${balancePlayerInEther_ethValue} ETH`);
        console.log(`Balance of PLAYER on TCOIN : ${balancePLAYERTcoinInEther_tcoinvalue} TCOIN`);
    /*














    //call get_valueTokenToTransfer2 function

    /*const valueInWei = ethers.utils.parseUnits("0.0003", "ether");
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
    */

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

