import { tokenActions } from './token-slice';

export const loadToken = () => {  
  return async(dispatch) => {
    dispatch(tokenActions.loaded(true));     
  }  
};

export const loadTokenBalance = (account, token) => {  
  return async(dispatch) => {
    const tokenBalance = await token.methods.balanceOf(account).call();
    dispatch(tokenActions.tokenBalanceLoaded());
    dispatch(tokenActions.getTokenBalance(tokenBalance));
  };
};