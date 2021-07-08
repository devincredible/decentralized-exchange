import { createSlice } from '@reduxjs/toolkit';

const web3Slice = createSlice({
  name: 'web3',
  initialState: {
     account: null,
     networkId: null,
     balance: null
  },
  reducers: {
    getAccount(state, action) {
      state.account = action.payload.account;
    },
    getNetworkId(state, action) {
      state.networkId = action.payload.networkId;
    },
    getBalance(state, action) {
      state.balance = action.payload.balance;
    }
  }
});

export const web3Actions = web3Slice.actions;

export default web3Slice;