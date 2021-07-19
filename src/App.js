import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import web3 from './instances/connection';
import Navbar from './components/Layout/Navbar';
import Content from './components/Content/Content';
import { loadAccount, loadNetworkId } from './store/web3-actions';
import { loadToken } from './store/token-actions';
import { loadExchange } from './store/exchange-actions';
import { getToken, getExchange } from './instances/contracts';
import './App.css';

const App = () => {  
  const contractsLoaded = useSelector(state => state.token.loaded && state.exchange.loaded);
  const account = useSelector(state => state.web3.account);
  
  const dispatch = useDispatch();
  
  useEffect(() => {    
    // Check if the user has Metamask active
    if(!web3) {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return;
    }    
    
    // Function to fetch all the blockchain data
    const loadBlockchainData = async() => {
      // Request accounts acccess if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });  
      } catch(error) {
        console.error(error);
      }
      
      // Load Account
      dispatch(loadAccount());

      // Load Network ID
      const networkId = await dispatch(loadNetworkId());
      
      // Load Contracts
      const token = getToken(networkId);
      const exchange = getExchange(networkId);

      if(token) {
        dispatch(loadToken());
      } else {
        window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.');
      }

      if(exchange) {
        dispatch(loadExchange());
      } else {
        window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamask.');
      }
    };

    loadBlockchainData();

    // Metamask Event Subscription - Account changed
    window.ethereum.on('accountsChanged', (accounts) => {
      dispatch(loadAccount());
    });

    // Metamask Event Subscription - Network changed
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  }, []);
  
  const showContent = web3 && account && contractsLoaded;

  return (
    <React.Fragment>
      <Navbar />
      {showContent && <Content />}
      {!showContent && <div className="content" />}
    </React.Fragment>
  );
}

export default App;
