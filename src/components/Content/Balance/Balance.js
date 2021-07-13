import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BalanceContent from './BalanceContent';
import { getToken, getExchange } from '../../../instances/contracts';
import { loadEtherBalance } from '../../../store/web3-actions';
import { loadTokenBalance } from '../../../store/token-actions';
import { loadExchangeEtherBalance, loadExchangeTokenBalance } from '../../../store/exchange-actions';
import Spinner from '../../Layout/Spinner';

const Balance = () => {  
  const account = useSelector(state => state.web3.account);
  const networkId = useSelector(state => state.web3.networkId);
  const token = getToken(networkId);
  const exchange = getExchange(networkId);  

  const etherBalanceLoaded = useSelector(state => state.web3.balance.loaded);
  const tokenBalanceLoaded = useSelector(state => state.token.balance.loaded);
  const exchangeEtherBalanceLoaded = useSelector(state => state.exchange.etherBalance.loaded);
  const exchangeTokenBalanceLoaded = useSelector(state => state.exchange.tokenBalance.loaded);  

  const dispatch = useDispatch();
  
  useEffect(() => {
    const loadBalances = () => {
      if(typeof account !== 'undefined') {      
        dispatch(loadEtherBalance(account));
        dispatch(loadTokenBalance(account, token));
        dispatch(loadExchangeEtherBalance(exchange, account));
        dispatch(loadExchangeTokenBalance(exchange, token, account));        
      } else {
        window.alert('Please login with MetaMask')
      }
    };

    loadBalances();
  }, []);  
  
  const showContent = etherBalanceLoaded && tokenBalanceLoaded && exchangeEtherBalanceLoaded && exchangeTokenBalanceLoaded;
  
  return(
    <div className="card bg-dark text-white">
    <div className="card-header">
      Balance
    </div>
    <div className="card-body">
      {showContent && <BalanceContent />}
      {!showContent && <Spinner />}
    </div>
  </div>   
  );
};

export default Balance;