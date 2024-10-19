//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.7; 
//pragma experimental SMTChecker;

import "../chainlink-develop/contracts/src/v0.8/ChainlinkClient.sol";

contract oracle  is ChainlinkClient{
    using Chainlink for Chainlink.Request;

    uint256 public data;
    bytes32 private jobId;
    uint256 private fee;

    event RequestData(bytes32 indexed requestId, uint256 data);

       constructor(){
        _setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        _setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
   
  }
 function requestGetData() public returns (bytes32 requestId) {
        Chainlink.Request memory request = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        request._add(
            "get",
            "https://historicaltxalchemy.vercel.app/get-transfers?vercelToolbarCode=3bwp2Zs2TnvkM9t&fromBlockUint=6855778"
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
      

}      