require("dotenv").config({path: "../.env"});

const GLDTokenSale = artifacts.require("GLDTokenSale.sol");
const GLDToken = artifacts.require("GLDToken.sol");

const chai = require("./setup-chai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("TokenSale Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("Should not have any tokens in my deployerAccount", async () => {
        const instance = await GLDToken.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("All tokens should be in the GLDTokenSale smart contract by default", async () => {
        const instance = await GLDToken.deployed();
        const balanceOfTokenSaleSmartContract = await instance.balanceOf(GLDTokenSale.address);
        const totalSupply = await instance.totalSupply();
        return expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    });

    it("Should be possible to buy tokens", async () => {
        const tokenInstance = await GLDToken.deployed();
        const tokenSaleInstance = await GLDTokenSale.deployed();
        const balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        expect(tokenSaleInstance.sendTransaction({ 
            from: deployerAccount, value: web3.utils.toWei("1", "wei")
        })).to.be.fulfilled;
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
    });
});