require("dotenv").config({path: "../.env"});

const GLDToken = artifacts.require("GLDToken.sol");

const chai = require("./setup-chai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("Token Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async () => {
        this.token = await GLDToken.new(process.env.INITIAL_TOKENS);
    });

    it("All tokens should be in my account", async () => {
        const instance = this.token;
        const totalSupply = await instance.totalSupply();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("Is possible to send tokens between accounts", async () => {
        const sendTokens = 1;
        const instance = this.token;
        const totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("Is not possible to send more tokens than available in total", async () => {
        const instance = this.token;
        const balanceOfDeployer = await instance.balanceOf(deployerAccount);
        expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.fulfilled;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
});

