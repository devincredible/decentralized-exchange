import { exchangeActions } from './exchange-slice';

export const loadExchange = () => {  
  return async(dispatch) => {
      dispatch(exchangeActions.loaded(true));     
  }  
};