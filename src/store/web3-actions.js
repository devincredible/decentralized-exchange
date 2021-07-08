import { web3Actions } from './web3-slice';
import web3 from '../instances/connection';

export const loadAccount = () => {  
  return async(dispatch) => {
    const accounts = await web3.eth.requestAccounts();
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