import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    loaded: false,
    balance: {
      loaded: false,
      data: null
    }
  },
  reducers: {
    loaded(state) {
      state.loaded = true;
    },
    tokenBalanceLoaded(state) {
      state.balance.loaded = true;
    },
    getTokenBalance(state, action) {
      state.balance.data = action.payload;
    }
  }
});

export const tokenActions = tokenSlice.actions;

export default tokenSlice;