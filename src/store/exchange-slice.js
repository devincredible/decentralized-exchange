import { createSlice } from '@reduxjs/toolkit';

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
     loaded: false,
  },
  reducers: {
    loaded(state) {
      state.loaded = true;
    }
  }
});

export const exchangeActions = exchangeSlice.actions;

export default exchangeSlice;