import { createSlice } from '@reduxjs/toolkit';

const web3Slice = createSlice({
  name: 'web3',
  initialState: {
    account: null,
    networkId: null,
    balance: {
      loaded: false,
      data: null
    }  
  },
  reducers: {
    getAccount(state, action) {
      state.account = action.payload.account;
    },
    getNetworkId(state, action) {
      state.networkId = action.payload.networkId;
    },
    etherBalanceLoaded(state) {
      state.balance.loaded = true;
    },
    getEtherBalance(state, action) {
      state.balance.data = action.payload;
    }  
  }
});

export const web3Actions = web3Slice.actions;

export default web3Slice;