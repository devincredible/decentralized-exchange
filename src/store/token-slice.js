import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
     loaded: false,
     balance: null
  },
  reducers: {
    loaded(state) {
      state.loaded = true;
    },
    getBalance(state, action) {
      state.balance = action.payload.balance;
    }
  }
});

export const tokenActions = tokenSlice.actions;

export default tokenSlice;