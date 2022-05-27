// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./Crowdsale.sol";
import "./KycContract.sol";

contract GLDTokenSale is Crowdsale {

    KcyContract kyc;

    constructor(
        uint256 rate,
        address payable wallet,
        IERC20 token,
        KcyContract _kyc
    ) Crowdsale(rate, wallet, token)  {
        kyc = _kyc;
     }

     function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
         super._preValidatePurchase(beneficiary, weiAmount);
         require(kyc.kycCompleted(msg.sender), "KYC not completed, purchase not allowed");
     }
}