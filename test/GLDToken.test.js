const GLDToken = artifacts.require("GLDToken.sol");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);

chai.use(chaiBN);
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {
    it("All tokens should be in my account", async () => {
        const instance = await GLDToken.deployed();
        const totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
    });
});

