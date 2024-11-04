//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AMM {

    ERC20   private _Token;
    uint256 public _ExpBalanceEther ;
    uint256 public _valueToTransfer ;
    uint256 public _ExpBalanceToken ;
    uint256 public initialbalancEether;
    uint256 public initialbalanceToken;
    uint256 public valamount ;
    uint256 public k;
    uint256 public amount_valueToTransfer;

    event Transfer(address indexed from, address indexed to, uint256 value);

    modifier checkAllowance(address owner, address spender,uint amount)  {
        require(_Token.allowance(owner, spender) >= amount, string(abi.encodePacked("Error: The sender is not allowed to spend this amount from ", spender)));
        _;
    }
    constructor (ERC20 token) {
       require(address(token) != address(0), "Address is empty!");
       _Token = token;
    }
    function TokensTransfer(address _to, uint256 _amount) public {
        require (_Token.balanceOf(address(this))>=_amount, "Insufficient balance");
       _Token.transfer(_to, _amount);
    }
    function TokensTransferFrom(address _from, address _to, uint256 _amount)public checkAllowance(_from, address(this),_amount) {
      require (_Token.balanceOf(_from)>=_amount, "Insufficient balance TCOIN");
               _Token.transferFrom(_from, _to, _amount);
    }
    function TransferEther(address payable recipient, uint256 amount) public payable {
        require(amount <= address(this).balance, "Insufficient balance ETHER");
        recipient.transfer(amount);
    }
    function get_TokenAddress() public view returns(address){
        return address(_Token);
    }
    function addLiquidity (uint256 _amount) external payable  {
        require( msg.value !=0 && _amount !=0,"msg Values to add are empty");
        TokensTransferFrom(msg.sender, address(this), _amount);
        emit Transfer(msg.sender, address(this), _amount); 
        require((address(this).balance)>0, "Insufficient balance.");
        initialbalancEether= (address(this).balance);
        initialbalanceToken=_Token.balanceOf(address(this));
    }
    function getBalanceOfERC20(address account) external view returns (uint256) {
        return _Token.balanceOf(account);
    }
    function getEtherBalance(address _address) public view returns (uint256){
        return _address.balance;
    }
    function getTokens() public view returns ( string memory _ether, string memory _symbol) {
        _ether = "ether"; 
        _symbol = _Token.symbol() ;
    }
    function getRate(string memory t) public view returns (uint256) {
        require(bytes(t).length != 0, "You have to specify the token before");
        uint256 balanceEther = address(this).balance;
        uint256 balanceToken = _Token.balanceOf(address(this));
        uint256 rate;
        if (balanceToken == 0 || balanceEther == 0) {
            rate = 0;
        } else {
        if (keccak256(abi.encodePacked(t)) == keccak256(abi.encodePacked("ether"))) {
            rate = (balanceEther * 10**6) / balanceToken; // scale ether up by 10^6
        } else if (keccak256(abi.encodePacked(t)) == keccak256(abi.encodePacked("tcoin"))) {
            rate = (balanceToken * 10**18) / balanceEther; // scale USDC up by 10^18
        } else {
            revert("Unsupported token type");
        }
    }
        return rate;
    }     
   function get_valueTokenToTransfer(uint256 amount) public returns(uint256){
        initialbalancEether= (address(this).balance);
        initialbalanceToken=_Token.balanceOf(address(this));
        valamount =amount;
        k = (initialbalancEether - amount) * initialbalanceToken;
       _ExpBalanceEther = initialbalancEether;
       _ExpBalanceToken = k  / _ExpBalanceEther;
       _valueToTransfer = initialbalanceToken - _ExpBalanceToken;
       return _valueToTransfer;
    } 
    function get_valueEtherToTransfer(uint256 amount) public returns(uint256){
        k = initialbalancEether * initialbalanceToken;
        _ExpBalanceToken=initialbalanceToken + amount;
        require(_ExpBalanceToken!=0, "invalid decvision by 0");
        _ExpBalanceEther = k  / _ExpBalanceToken;
        _valueToTransfer = initialbalancEether  - _ExpBalanceEther;
       return _valueToTransfer;
    }         
   function swap(uint256 _amount)  public payable {
        if (_amount==0){
            amount_valueToTransfer= get_valueTokenToTransfer(msg.value);
            require ((_Token.balanceOf(address(this)) )>=amount_valueToTransfer, "insuficient balance of USDC");
            bool transfer = _Token.transfer(msg.sender, amount_valueToTransfer);
            require (transfer==true, "faild transdfer USDC");
            initialbalancEether= (address(this).balance);
            initialbalanceToken=_Token.balanceOf(address(this));
        }
        else 
        {   
            amount_valueToTransfer= get_valueEtherToTransfer(_amount);
            TokensTransferFrom(msg.sender, address(this), _amount*10**6);
            require(address(this).balance>=amount_valueToTransfer, "insuficient balance of USDC");
            (bool success, ) = payable(msg.sender).call{value: amount_valueToTransfer*(10**18)}("");
            require(success, "Failed to send Ether");
        }      
    }
}
