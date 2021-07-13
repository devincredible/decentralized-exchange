import { createSlice } from '@reduxjs/toolkit';

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
    loaded: false,
    etherBalance: {
      loaded: false,
      data: null
    },
    tokenBalance: {
      loaded: false,
      data: null
    }
  },
  reducers: {
    loaded(state) {
      state.loaded = true;
    },
    etherBalanceLoaded(state) {
      state.etherBalance.loaded = true;
    },
    etherBalanceLoading(state) {
      state.etherBalance.loaded = false;
    },
    getEtherBalance(state, action) {
      state.etherBalance.data = action.payload;
    },
    tokenBalanceLoaded(state) {
      state.tokenBalance.loaded = true;
    },
    tokenBalanceLoading(state) {
      state.tokenBalance.loaded = false;
    },
    getTokenBalance(state, action) {
      state.tokenBalance.data = action.payload;
    }
  }
});

export const exchangeActions = exchangeSlice.actions;

export default exchangeSlice;