import { tokenActions } from './token-slice';

export const loadToken = () => {  
  return async(dispatch) => {
      dispatch(tokenActions.loaded(true));     
  }  
};