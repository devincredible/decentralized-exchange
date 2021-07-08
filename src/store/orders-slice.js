import { createSlice } from '@reduxjs/toolkit';

let index, data;

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    cancelledOrders: {
      loaded: false,
      data: []
    },
    filledOrders: {
      loaded: false,
      data: []
    },
    allOrders: {
      loaded: false,
      data: []
    },
    orderCancelling: false
  },
  reducers: {
    fetchCancelledOrders(state, action) {
      state.cancelledOrders = {
        loaded: true,
        data: action.payload
      }
    },
    fetchFilledOrders(state, action) {
      state.filledOrders = {
        loaded: true,
        data: action.payload
      }
    },
    fetchAllOrders(state, action) {
      state.allOrders = {
        loaded: true,
        data: action.payload
      }
    },
    cancelledOrder(state, action) {
      state.orderCancelling = false;
      state.cancelledOrders.data = [...state.cancelledOrders.data, action.payload]
    },
    filledOrder(state, action) {
      // Prevent duplicate orders
      index = state.filledOrders.data.findIndex(order => order.id === action.payload.id);
      if(index === -1) {
        state.filledOrders.data = [...state.filledOrders.data, action.payload];
      }      
      
      state.orderFilling = false;

    }
  }
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;