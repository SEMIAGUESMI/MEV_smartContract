//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./AMM.sol";

contract Bet is ChainlinkClient, ConfirmedOwner {

    using Chainlink for Chainlink.Request;
    uint256 public data;
    bytes32 private jobId;
    uint256 private fee;
    address public ownerBet;
    address public player;
    uint public deadline;
    uint public rateBet;
    address public contractAMM;
    address public tok;
    uint256 public initialpot;
    uint256 public timestampBet;
    ERC20   private _Token;
    uint256 public blocknumber ;
    uint256 public rateAMM;
    string public txHashBetFunction;
    uint256 public balanceEther ;
    uint256 public balanceToken ;
    string public url ;
    string public adrfrom ;
    string public adrto ;
    string public fromblockk;
    bool public isWaitingForOracle = false;
    uint256 public nbBackrunningTransactioninFinalizefuncBegin;

    event  RequestVolume(bytes32 indexed requestId, uint256 volume);

    /**
     * @notice Initialize the link token and target oracle
     *
     * Sepolia Testnet details:
     * Link Token: 0x779877A7B0D9E8603169DdbD7836e478b4624789
     * Oracle: 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD (Chainlink DevRel)
     * jobId: ca98366cc7314957b8c012c72f05aeeb
     *
     */
    constructor(address _oracle, address  _tok, uint256 _rate, uint256 _deadline) payable ConfirmedOwner(msg.sender) {
        //require(msg.value !=0 ether, "you should start the bet by an amount of ether ");
        require(_oracle != address(0), "Oracle address cannot be NULL");
        require(_tok != address(0), "token address cannot be NULL");
        require(_rate>0, "rate must be not null");
        tok = _tok;     
        rateBet = _rate;
        ownerBet = msg.sender;    
        deadline = _deadline;
        contractAMM = _oracle;
        _Token = ERC20(_tok);
        _setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        _setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }
    function bet() external payable {
          //require(player == address(0), "Player already set");
          //require(msg.value == address(this).balance - msg.value, "msg.value must equal the contract balance");
          player = msg.sender;
          timestampBet = block.timestamp; 
          blocknumber = block.number;
    }
    function win() public {
      require(getCurrentTimestamp() <= deadline, "Bet deadline has passed");
      require(msg.sender == player, "Only the player can call this");
      rateAMM = AMM(contractAMM).getRate("ether");
      setrateAMM(rateAMM);
      require(rateAMM > rateBet, "AMM rate must be greater than BET rate");
      requestVolumeData3(player, contractAMM, blocknumber);
    }
    function finalizewin (uint256 _data) public {
        require(_data==0, "MEV ATTECK Attempt");  
        (bool success, ) = payable(player).call{value: getEtherBalance(address(this))}("");
        require(success, "Failed to send Ether");
    }
    function fulfill(bytes32 _requestId, uint256 _data) public recordChainlinkFulfillment(_requestId) {
        emit RequestVolume(_requestId, _data);
        data=_data;
        finalizewin(_data);   
    }
    function requestVolumeData3(address _fromAddress, address _toAddress, uint256 _fromBlock) public returns (bytes32 requestId) {
        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        string memory fromaddress= adrToString(_fromAddress);
        string memory toAddress= adrToString(_toAddress);
        string memory  fromUintBlock= uintToString(_fromBlock);
        string memory baseUrl = "https://historicaltxalchemy.vercel.app/get-transfers?vercelToolbarCode=0Slkd77nik9k_Zu7";
        string memory urlreq = string(
            abi.encodePacked(
                baseUrl,
                "&fromBlockUint=", fromUintBlock,
                "&fromAddress=", fromaddress,
                "&toAddress=", toAddress
            )
        );
        setUrl(urlreq);
        setadrfrom(fromaddress);
        setadrto(toAddress);
        setfromblockk(fromUintBlock);
        req._add("get", urlreq);
        req._add("path", "data"); 
        int256 timesAmount = 10 ** 18;
        req._addInt("times", timesAmount);
        return _sendChainlinkRequest(req, fee);
    }
    function uintToString(uint256 value) internal pure returns (string memory) {
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
    function adrToString(address _addr) internal pure returns (string memory) {
    return Strings.toHexString(uint256(uint160(_addr)), 20);
    }
    function setTxHashBet (string memory _hash) public {
        txHashBetFunction=_hash;
    }
    function getEtherBalance(address _address) public view returns (uint256){
        return _address.balance;
    }
    function getrateAMM () public view returns(uint256){
        return( AMM(contractAMM).getRate("ether"));  
    }
    function setUrl (string memory _url) public {url=_url;}

    function setadrfrom (string memory _adrfrom) public {adrfrom=_adrfrom;}

    function setadrto (string memory _adrto) public{adrto=_adrto;}

    function setfromblockk (string memory _fromblockk) public{fromblockk=_fromblockk;}

    function setrateAMM (uint256 _rateAMM) public{rateAMM=_rateAMM;}

    function getcontractAMM () public view returns(address){return contractAMM;}

    function getfromblockk () public view returns(string memory){return fromblockk;}

    function getadrto () public view returns(string memory){return adrto;}

    function getadrfrom () public view returns(string memory){return adrfrom;}

    function getUrl () public view returns(string memory){return url;}

    function getCurrentTimestamp() public view returns (uint256) {return block.timestamp;}

    function getdata() public view returns (uint256) {return data;}
}