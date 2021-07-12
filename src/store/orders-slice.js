import { createSlice } from '@reduxjs/toolkit';
import { reject } from 'lodash';

let index;

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
    orderCancelling: false,
    orderFilling: false,
    openOrders: {
      loaded: false,
      data: []
    },
    orderBuying: false,
    orderSelling: false
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
    openOrders(state) {
      const all = state.allOrders.data;
      const filled = state.filledOrders.data;
      const cancelled = state.cancelledOrders.data; 
      
      state.openOrders.data = reject(all, (order) => {
        const orderFilled = filled.some((o) => o.id === order.id);
        const orderCancelled = cancelled.some((o) => o.id === order.id);
        return (orderFilled || orderCancelled);
      });
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
    },
    orderFilling(state) {
      state.orderFilling = true;
    },
    orderCancelling(state) {
      state.orderCancelling = true;
    },
    buyOrderMaking(state) {
      state.orderBuying = true;
    },
    sellOrderMaking(state) {
      state.orderSelling = true;
    },
    orderMade(state, action) {
      // Prevent duplicate orders
      index = state.allOrders.data.findIndex(order => order.id === action.payload.id);

      if(index === -1) {
        state.allOrders.data = [...state.allOrders.data, action.payload];
      }

      state.orderBuying = false;
      state.orderSelling = false;
    }
  }
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;