import { web3Actions } from './web3-slice';
import web3 from '../instances/connection';

export const loadAccount = () => {  
  return async(dispatch) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    dispatch(web3Actions.getAccount({
      account
    }));
  };
};

export const loadNetworkId = () => {  
  return async(dispatch) => {
    const networkId = await web3.eth.net.getId();
    dispatch(web3Actions.getNetworkId({
      networkId
    }));
  
    return networkId;
  };
};

export const loadEtherBalance = (account) => {  
  return async(dispatch) => {
    const etherBalance = await web3.eth.getBalance(account)
    dispatch(web3Actions.etherBalanceLoaded());
    dispatch(web3Actions.getEtherBalance(etherBalance));
  };
};