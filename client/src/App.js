import React, { Component } from "react";
import GLDToken from "./contracts/GLDToken.json";
import GLDTokenSale from "./contracts/GLDTokenSale.json";
import KycContract from "./contracts/KcyContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: "", tokenSaleAddress: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.tokenInstance = new this.web3.eth.Contract(
        GLDToken.abi,
        GLDToken.networks[this.networkId] && GLDToken.networks[this.networkId].address,
      );

      this.tokenSaleInstance = new this.web3.eth.Contract(
        GLDTokenSale.abi,
        GLDTokenSale.networks[this.networkId] && GLDTokenSale.networks[this.networkId].address,
      );

      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handlerInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async handleKycWhitelistng() {
    await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
    alert(`KYC for ${this.state.kycAddress} is completed`);
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>StarDucks Gold Token Sale</h1>
        <p>Get your Tokens today!</p>
        <h2>Kcy Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handlerInputChange}/>
        <button type="button" onClick={this.handleKycWhitelistng}>Add to Whitelist</button>
        <h2>Buy Tokens</h2>
        <p>If you want to buy toksn, send wei to this address: {this.state.tokenSaleAddress}</p>
      </div>
    );
  }
}

export default App;
