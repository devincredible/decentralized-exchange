import web3 from './connection';
import Token from '../abis/Token.json';
import Exchange from '../abis/Exchange.json';

// Token contract
export const getToken = (networkId) => {
  try {
    return new web3.eth.Contract(Token.abi, Token.networks[networkId].address);
  } catch(error) {
    return;
  }
};

// Exchange contract
export const getExchange = (networkId) => {
  try {
    return new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address);
  } catch(error) {
    return;
  }
};