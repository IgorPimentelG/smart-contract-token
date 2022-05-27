// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./Crowdsale.sol";

contract GLDTokenSale is Crowdsale {
    constructor(
        uint256 rate,
        address payable wallet,
        IERC20 token
    ) Crowdsale(rate, wallet, token)  { }
}