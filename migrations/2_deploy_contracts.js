const GLDToken = artifacts.require("GLDToken.sol");
const GLDTokenSale = artifacts.require("GLDTokenSale.sol");
const KycContract = artifacts.require("KycContract");

require("dotenv").config({path: "../.env"});

module.exports = async (deployer) => {
    const addr = await web3.eth.getAccounts();
    await deployer.deploy(GLDToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(GLDTokenSale, 1, addr[0], GLDToken.address, KycContract.address);
    const instance = await GLDToken.deployed();
    await instance.transfer(GLDTokenSale.address, process.env.INITIAL_TOKENS);
}