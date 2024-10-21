//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0; 
//pragma experimental SMTChecker;

import "../openzeppelin-contracts-master/contracts/token/ERC20/ERC20.sol";
import "../openzeppelin-contracts-master/contracts/token/ERC20/IERC20.sol";
import "../chainlink-develop/contracts/src/v0.8/ChainlinkClient.sol";
import "../openzeppelin-contracts-master/contracts/utils/Strings.sol";
import "./AMM.sol";

contract Bet is ChainlinkClient {
     using Chainlink for Chainlink.Request;

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
    uint256 public data;

    event RequestData(bytes32 indexed requestId, uint256 data);

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

        _setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        _setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
   
  }
  function uintToString(uint v) internal pure returns (string memory str) {
    return Strings.toString(v);
}

function addressToString(address _addr) internal pure returns (string memory) {
    return Strings.toHexString(uint160(_addr), 20);
}
 function requestGetData(uint256 fromblock, address _addressFrom, address _addressTo) public returns (bytes32 requestId) {
        Chainlink.Request memory request = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        string memory baseURL = "https://historicaltxalchemy.vercel.app/get-transfers?vercelToolbarCode=3bwp2Zs2TnvkM9t&";
        string memory fromBlockStr = uintToString(fromblock);
        string memory addressFromStr = addressToString(_addressFrom);
         string memory addressToStr = addressToString(_addressTo);

    // Concatenate the URL with the parameters
    string memory fullURL = string.concat(
        baseURL,
        "&fromBlock=",
        fromBlockStr,
        "&addressFrom=",
        addressFromStr,
        "&addressTo=",
        addressToStr
    );

        request._add(
            "get",
            fullURL
        );

        request._add("path", "data");

        // Sends the request
        return _sendChainlinkRequest(request, fee);
    }
    function fulfill(bytes32 _requestId, uint256 _data)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestData(_requestId, _data);
        data = _data;
        
    }
    function getdata()public view returns (uint256){
        return data;
    }
      
     function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }
    function bet() external payable {
      require(player == address(0), "Player already set");
      require(msg.value == address(this).balance - msg.value, "msg.value must equal the contract balance");
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
       requestGetData(blocknumber,msg.sender,oracle);
       require (data==0, " it seems that you are not a fair player, there is a MEV attempt ");
       (bool success, ) = payable(msg.sender).call{value: getEtherBalance(address(this))}("");
       require(success, "Failed to send Ether");   
    }
}      