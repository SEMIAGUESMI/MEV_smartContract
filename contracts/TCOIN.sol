// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;
      
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TCOIN is ERC20 {  
    address public  owner ;  
    constructor() ERC20("T Coin", "TCOIN") {
        _mint(msg.sender, 10000 * (10**6));
        owner = msg.sender;
        }
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
   }