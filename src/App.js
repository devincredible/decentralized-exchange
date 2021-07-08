import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadAccount, loadNetworkId } from './store/web3-actions';
import { loadToken } from './store/token-actions';
import { loadExchange } from './store/exchange-actions';
import { getToken, getExchange } from './instances/contracts';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {    
    dispatch(loadAccount());
    
    const contractAlert = async() => {
      const networkId = await dispatch(loadNetworkId());
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

    }

    contractAlert();
  }, [dispatch]);
  
  return (
    <div>
      PEPE
    </div>
  );
}

export default App;
