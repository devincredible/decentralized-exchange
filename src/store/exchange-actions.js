import { exchangeActions } from './exchange-slice';
import { ETHER_ADDRESS } from '../helpers/utils';
import { loadEtherBalance } from './web3-actions'
import { loadTokenBalance } from './token-actions'

export const loadExchange = () => {  
  return async(dispatch) => {
    dispatch(exchangeActions.loaded(true));     
  }  
};

export const loadExchangeEtherBalance = (exchange, account) => {  
  return async(dispatch) => {
    const etherBalance = await exchange.methods.balanceOf(ETHER_ADDRESS, account).call();
    dispatch(exchangeActions.etherBalanceLoaded());
    dispatch(exchangeActions.getEtherBalance(etherBalance));
  };
};

export const loadExchangeTokenBalance = (exchange, token, account) => {  
  return async(dispatch) => {
    const tokenBalance = await exchange.methods.balanceOf(token.options.address, account).call();
    dispatch(exchangeActions.tokenBalanceLoaded());
    dispatch(exchangeActions.getTokenBalance(tokenBalance));
  };
};

export const loadDepositEther = (exchange, web3, account, amount) => {  
  return async(dispatch) => {
    exchange.methods.depositEther().send({ from: account,  value: web3.utils.toWei(amount, 'ether') })
    .on('transactionHash', (hash) => {
      dispatch(exchangeActions.etherBalanceLoading());
    })
    .on('error',(error) => {
      console.error(error);
      window.alert(`There was an error!`);
    })
  };
};

export const loadWithdrawEther = (exchange, web3, account, amount) => {  
  return async(dispatch) => {
    exchange.methods.withdrawEther(web3.utils.toWei(amount, 'ether')).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch(exchangeActions.etherBalanceLoading());
    })
    .on('error',(error) => {
      console.error(error);
      window.alert(`There was an error!`);
    })
  };
};

export const loadDepositToken = (exchange, web3, account, amount, token) => {  
  return async(dispatch) => {
    amount = web3.utils.toWei(amount, 'ether');

    token.methods.approve(exchange.options.address, amount).send({ from: account })
    .on('transactionHash', (hash) => {
      exchange.methods.depositToken(token.options.address, amount).send({ from: account })
      .on('transactionHash', (hash) => {
        dispatch(exchangeActions.tokenBalanceLoading());
      })
      .on('error', (error) => {
        console.error(error);
        window.alert(`There was an error!`);
      })
    })
  };
};

export const loadWithdrawToken = (exchange, web3, account, amount, token) => {  
  return async(dispatch) => {
    exchange.methods.withdrawToken(token.options.address, web3.utils.toWei(amount, 'ether')).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch(exchangeActions.tokenBalanceLoading());
    })
    .on('error',(error) => {
      console.error(error);
      window.alert(`There was an error!`);
    })
  };
};

export const subscribeEventsExchange = (exchange, token, web3, account) => {  
  return async(dispatch) => {    
    exchange.events.Deposit({}, async(error, event) => {
      if(event.returnValues.token === ETHER_ADDRESS) {
        dispatch(loadEtherBalance(account));
        dispatch(loadExchangeEtherBalance(exchange, account));
      } else {
        dispatch(loadTokenBalance(account, token));
        dispatch(loadExchangeTokenBalance(exchange, token, account));
      }  
    });

    exchange.events.Withdraw({}, async(error, event) => {
      if(event.returnValues.token === ETHER_ADDRESS) {
        dispatch(loadEtherBalance(account));
        dispatch(loadExchangeEtherBalance(exchange, account));
      } else {
        dispatch(loadTokenBalance(account, token));
        dispatch(loadExchangeTokenBalance(exchange, token, account));
      }
    });
  }  
};