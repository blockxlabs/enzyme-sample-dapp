import { web3Enable, web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';
import { stringToHex } from '@polkadot/util';
import React from 'react';
import './App.css';

class App extends  React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      grantAccessResult : "", 
      getAccountsResult: "", 
      signMessageResult: "",
      signMessageAddress: null, 
    };

    // This binding is necessary to make `this` work in the callback
    this.handleGrantAccess = this.handleGrantAccess.bind(this);
    this.handleGetAccounts = this.handleGetAccounts.bind(this);
    this.handleSignMessage = this.handleSignMessage.bind(this);
  }
    async handleGrantAccess() {
      try {
        const [accessResult] = await web3Enable('Enzyme Sample DApp');
        // console.log('accessResult: ', accessResult);
        this.setState(state => ({
          grantAccessResult: `Enable Request: ${accessResult.name}  `
        }));
      } catch(err){
        this.setState(state => ({
          grantAccessResult: `Enable  Request Error: ${err.message}`
        }));
      } 
    }

    async handleGetAccounts() {
      try {
        const allAccounts = await web3Accounts();
        // console.log('allAccounts: ', allAccounts);
        if(allAccounts.length === 0){
          throw(Error('No accounts available'));
        }
        const [account] = allAccounts;
        this.setState(state => ({
          getAccountsResult: `Get Accounts Length: ${allAccounts.length}, SignMessage: ${account.address}`,
          signMessageAddress: account.address
        }));
      } catch (err) {
        this.setState(state => ({
          getAccountsResult: `Get Accounts Error: ${err.message}`
        }));
      }
    }


    async handleSignMessage() {
      try {
        const address = this.state.signMessageAddress;
        if(address==null){
          throw(Error('Invalid Address'));
        }
        const injector = await web3FromAddress(address);
        // console.log('injector: ', injector);
        const result = await injector.signer.signRaw({
          address,
          data: stringToHex(`Test message ${Date()}`),
          type: 'bytes'
        });
        // console.log('result: ', result)
        this.setState(state => ({
          signMessageResult: `Signed Message: ${result.signature}`
        }));
      } catch (err) {
        this.setState(state => ({
          signMessageResult: `Enable Request Error: ${err.message}`
        }));
      }
    }
    render() {
      return (
      <div className="App">
        <h1 className='title'> Enzyme Sample DApp </h1>

        <div className="position">
          <h3 className='header'>Enable Request</h3>
          <p className="description">This button allows for your account information to be injected into the DApp. Enzyme can prevent this on privacy mode for security.</p>
          <button id="grantAccess" type="button" className="button" onClick={this.handleGrantAccess}>Authenticate</button>
          <div id="grantsAccess" className='hash'>
            {this.state.grantAccessResult}
          </div>
        </div>

        <div className="position">
          <h3 className='header'>Get Accounts</h3>
          <p className="description">Get Accounts.</p>
          <button id="getAccounts" type="button" className="button" onClick={this.handleGetAccounts}>Get</button>
          <div id="getAccountsResult" className='hash'>
            {this.state.getAccountsResult}
          </div>
        </div>

        <div className="position">
          <h3 className='header'>Sign Message</h3>
          <p className="description">Signs a message with your private key. Can be used to prove a specific user verified an action.</p>
          <button id="sign" type="button" className="button" onClick={this.handleSignMessage}>Sign</button>
          <div id="signResult" className='hash'>
            {this.state.signMessageResult}
          </div>
        </div>

        <div className="position">
          <p>        
            <a href="https://github.com/blockxlabs/enzyme-sample-dapp" target="_blank" rel="noopener noreferrer">View the code</a>
          </p>
        </div>
      </div>
    )
  };
}

export default App;
