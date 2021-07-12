import { exchangeActions } from './exchange-slice';
import { ETHER_ADDRESS } from '../helpers/utils';

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
  
    return etherBalance;
  };
};

export const loadExchangeTokenBalance = (exchange, token, account) => {  
  return async(dispatch) => {
    const tokenBalance = await exchange.methods.balanceOf(token.options.address, account).call();
    dispatch(exchangeActions.tokenBalanceLoaded());
    dispatch(exchangeActions.getTokenBalance(tokenBalance));
  
    return tokenBalance;
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

export const subscribeEventsExchange = (exchange) => {  
  return async(dispatch) => {    
    exchange.events.Deposit({}, (error, event) => {
      if(event.returnValues.token === ETHER_ADDRESS) {
        dispatch(exchangeActions.etherBalanceLoaded());
      } else {
        dispatch(exchangeActions.tokenBalanceLoaded());
      }      
    });

    exchange.events.Withdraw({}, (error, event) => {
      if(event.returnValues.token === ETHER_ADDRESS) {
        dispatch(exchangeActions.etherBalanceLoaded());
      } else {
        dispatch(exchangeActions.tokenBalanceLoaded());
      }      
    });
  }  
};