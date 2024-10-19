const {ethers} = require('ethers');
require('dotenv').config({ path: '../.env' });

const {AMMaddress, AMMABI,TCOINAddress, TCOINABI} = require ('../constants.js');
const getEthereumContract =(address, abi, signer)=>{
    const TransactionContract = new ethers.Contract(address, abi, signer);
    return TransactionContract
    }
(async ()=> {
    const alchemy= new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
    const userADDliq= new ethers.Wallet(process.env.PRIVATE_KEY_WALLET, alchemy);
    const AMMContract=  getEthereumContract(AMMaddress,AMMABI,userADDliq);
    const TCOINContract =  getEthereumContract(TCOINAddress, TCOINABI, userADDliq );


    let balanceAMMInEther1 = await alchemy.getBalance(AMMContract.address);
    let balanceAMMInEther_tcoinvalue1 = await AMMContract.getBalanceOfERC20(AMMContract.address);
    let balanceAmmInEther_ethValue1 = ethers.utils.formatEther(balanceAMMInEther1);
    console.log(`Balance of AMM on eth before add liquidity : ${balanceAmmInEther_ethValue1} ETH`);
    console.log(`Balance of AMM on tcoin before add liquidity: ${balanceAMMInEther_tcoinvalue1} TCOIN`);

    // PPROVE
    const amountToApprove = ethers.utils.parseUnits("600", 6); // 600 tcoin
    const approveTx = await TCOINContract.connect(userADDliq).approve(AMMContract.address, amountToApprove);
    await approveTx.wait(); // Wait for the transaction to be mined
    const allowanceValue = await TCOINContract.allowance(userADDliq.address, AMMContract.address);
    console.log("Allowance Value:", ethers.utils.formatUnits(allowanceValue, 6)); // Convert from smallest units to tcoin
    
    const valueInWei = ethers.utils.parseUnits("0.0006", "ether");
    const val= BigInt(valueInWei);
    const tx = await AMMContract.connect(userADDliq).addLiquidity(amountToApprove, { value: val });
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
    console.log(`Balance of AMM on eth after liquidity: ${balanceAmmInEther_ethValue} ETH`);
    console.log(`Balance of AMM on tcoin after liquidity: ${balanceAMMInEther_tcoinvalue/10**6} TCOIN`);

})();



