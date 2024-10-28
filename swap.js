const { ethers } = require('ethers');
require('dotenv').config();

const { AMMaddress, AMMABI, TCOINAddress, TCOINABI } = require('./constants.js');

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

    // TEST ADDLIQUIDITY
    /*
    const amountToApprove = ethers.utils.parseUnits("600", 6); // 600 tcoin
    const approveTx = await TCOINContract.connect(samia).approve(AMMContract.address, amountToApprove);
    await approveTx.wait(); // Wait for the transaction to be mined
    const allowanceValue = await TCOINContract.allowance(samia.address, AMMContract.address);
    console.log("Allowance Value:", ethers.utils.formatUnits(allowanceValue, 6)); // Convert from smallest units to tcoin

    const valueInWei = ethers.utils.parseUnits("0.0006", "ether");
    const val1 = BigInt(valueInWei);
    console.log(val);
    const tx = await AMMContract.connect(samia).addLiquidity(amountToApprove, { value: val1 });
    await tx.wait();

    console.log(tx);
    receipt = null;
    while (receipt === null) {
        receipt = await alchemy.getTransactionReceipt(tx.hash);
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
    console.log(`Balance of AMM on tcoin: ${balanceAMMInEther_tcoinvalue / 10 ** 6} TCOIN`);
*/
    // TEST SWAP
    
    const etherAmount2 = ethers.utils.parseUnits("0.000003", "ether");
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
    //TEST GET RATE
    console.log("rate ether", parseFloat((await AMMContract.getRate("ether")).toString()) / 10 ** 12);

})();

