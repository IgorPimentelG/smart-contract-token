const GLDToken = artifacts.require("GLDToken.sol");

module.exports = async (deployer) => {
    await deployer.deploy(GLDToken, 1000000);
}