// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
      
import "../openzeppelin-contracts-master/contracts/token/ERC20/IERC20.sol";
import "../openzeppelin-contracts-master/contracts/token/ERC20/ERC20.sol";
contract TCOIN is ERC20 {  
    address public  owner ;  
    constructor() ERC20("T Coin", "TCOIN") {
        _mint(msg.sender, 10000 * (10**6));
        owner = msg.sender;
        }
    // Override the decimals function to return 6
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
   }
      