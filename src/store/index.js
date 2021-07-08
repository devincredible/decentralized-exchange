import { configureStore } from '@reduxjs/toolkit';

import web3Slice from './web3-slice';
import tokenSlice from './token-slice';
import exchangeSlice from './exchange-slice';

const store = configureStore({
  reducer: {
    web3: web3Slice.reducer,
    token: tokenSlice.reducer,
    exchange: exchangeSlice.reducer 
  }  
});

export default store;