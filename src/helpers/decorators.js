import moment from 'moment';

import { tokens, ether, ETHER_ADDRESS, GREEN, RED } from './utils';

export const decorateFilledOrders = (orders) => {
  let previousOrder = orders[0];
  
  return(
    orders.map((order) => {
      order = decorateOrder(order);
      order = decorateFilledOrder(order, previousOrder);
      previousOrder = order // Update the previous order once it's decorated
      return order;
    })
  );
};

export const decorateOrder = (order) => {
  let etherAmount;
  let tokenAmount;

  if(order.tokenGive === ETHER_ADDRESS) {
    etherAmount = order.amountGive;
    tokenAmount = order.amountGet;
  } else {
    etherAmount = order.amountGet;
    tokenAmount = order.amountGive;    
  }

  // Calculate the token price to 5 decimals
  const precision = 100000;
  let tokenPrice = (etherAmount / tokenAmount);
  tokenPrice = Math.round(tokenPrice * precision) / precision;

  return {
    ...order,
    etherAmount: ether(etherAmount),
    tokenAmount: tokens(tokenAmount),
    tokenPrice,
    formattedTimestamp: moment.unix(order.timestamp).format('h:mm:ss a M/D')
  };
};

export const decorateFilledOrder = (order, previousOrder) => {
  return({
    ...order,
    tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, previousOrder)
  });
};

export const tokenPriceClass = (tokenPrice, orderId, previousOrder) => {
  // Show green price if only one order exists
  if(previousOrder.id === orderId) {
    return GREEN;
  }
  
  // Show green price if order price is higher than previous order
  // Show red price if order price is lower than previous order
  if(previousOrder.tokenPrice <= tokenPrice) {
    return GREEN; // success
  } else {
    return RED; // danger
  }
};

export const decorateOrderBookOrders = (orders) => {
  return (
    orders.map((order) => {
      order = decorateOrder(order);
      order = decorateOrderBookOrder(order);
      return(order);
    })
  );
};

export const decorateOrderBookOrder = (order) => {
  const orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';
  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED),
    orderFillAction: orderType === 'buy' ? 'sell' : 'buy'
  });
};

export const decorateMyFilledOrders = (orders, account) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order);
      order = decorateMyFilledOrder(order, account);
      return(order);
    })
  );
};

export const decorateMyFilledOrder = (order, account) => {
  const myOrder = order.user === account;
  
  let orderType;
  if(myOrder) {
    orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';
  } else {
    orderType = order.tokenGive === ETHER_ADDRESS ? 'sell' : 'buy';
  }

  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED),
    orderSign: (orderType === 'buy' ? '+' : '-')
  });
};

export const decorateMyOpenOrders = (orders, account) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order);
      order = decorateMyOpenOrder(order, account);
      return(order);
    })
  );
};

export const decorateMyOpenOrder = (order, account) => {
  let orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';
  
  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED)
  });
};





