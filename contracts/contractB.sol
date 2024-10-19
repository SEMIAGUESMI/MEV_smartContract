//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0; 
//pragma experimental SMTChecker;

import "../openzeppelin-contracts-master/contracts/token/ERC20/ERC20.sol";
import "../openzeppelin-contracts-master/contracts/token/ERC20/IERC20.sol";
import "./AMM.sol";

contract contractB {
    
    address public owner;
    address public player;
    uint public deadline;
    uint public rate;
    address public oracle;
    address public tok;
    uint256 public initialpot;
    uint256 public timestampBet;
    ERC20   private _Token;
    uint256 public balanceEther ;
    uint256 public balanceToken ;
    uint256 public blocknumber ;
    uint256 private rateAMM;
    string public txHashBetFunction;
    uint256 public response;
    bytes32 private jobId;
    uint256 private fee;

    constructor(address _oracle, address  _tok, uint256 _rate, uint256 _deadline,  address _oracle1, bytes32 _jobId, address _link) payable {
      require(msg.value !=0 ether, "you should start the bet by an amount of ether ");
      require(_oracle != address(0), "Oracle address cannot be NULL");
      require(_tok != address(0), "token address cannot be NULL");
      require(_rate>0, "rate must be not null");
        tok = _tok;     
        rate = _rate;
        owner = msg.sender;    
        deadline = _deadline;
        oracle = _oracle;
        _Token = ERC20(_tok);
    }

     function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }
    function bet() external payable {
      //require(player == address(0), "Player already set");
      //require(msg.value == address(this).balance - msg.value, "msg.value must equal the contract balance");
       player = msg.sender;
       timestampBet = block.timestamp; 
       blocknumber = block.number; 
    }
      function setTxHashBet (string memory _hash) public {
        txHashBetFunction=_hash;
    }
     function getEtherBalance(address _address) public view returns (uint256){
        return _address.balance;
    }   
    
     function win() external {
      require(getCurrentTimestamp() <= deadline, "Bet deadline has passed");
      require(msg.sender == player, "Only the player can call this");
      rateAMM = AMM(oracle).getRate("ether");
       require(rateAMM > rate, "AMM rate must be greater than BET rate");
       (bool success, ) = payable(msg.sender).call{value: getEtherBalance(address(this))}("");
       require(success, "Failed to send Ether");   
    }
}      