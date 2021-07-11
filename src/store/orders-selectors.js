import { get, reject, groupBy, minBy, maxBy } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { decorateFilledOrders, decorateOrderBookOrders, decorateMyFilledOrders, decorateMyOpenOrders, decorateOrder } from '../helpers/decorators';

const account = state => get(state, 'web3.account');
const allOrders = state => get(state, 'orders.allOrders.data', []);
const filledOrders = state => get(state, 'orders.filledOrders.data', []);
const cancelledOrders = state => get(state, 'orders.cancelledOrders.data', []);


// Filled Orders
export const filledOrdersSelector = createSelector(
  filledOrders,
  data => {       
    // Sort orders by date ascending for price comparison
    let orders = [...data];
    orders.sort((a, b) => a.timestamp - b.timestamp);
    // Decorate the  orders
    orders = decorateFilledOrders(orders);
    // Sort orders by date desdending
    orders = orders.sort((a, b) => b.timestamp - a.timestamp); 
    return orders;
});

export const myFilledOrdersSelector = createSelector(
  account,
  filledOrders,
  (account, data) => {
    // Find our orders
    let orders = [...data];
    orders = orders.filter((o) => o.user === account || o.userFill === account)
    // Sort by date ascending
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = decorateMyFilledOrders(orders, account)
    return orders
  }
);

// Open Orders
const openOrders = state => {
  const all = allOrders(state);
  const filled = filledOrders(state);
  const cancelled = cancelledOrders(state);  

  const openOrders = reject(all, (order) => {
    const orderFilled = filled.some((o) => o.id === order.id);
    const orderCancelled = cancelled.some((o) => o.id === order.id);
    return (orderFilled || orderCancelled);
  });

  return openOrders;  
}

export const myOpenOrdersSelector = createSelector(
  account,
  openOrders,
  (account, orders) => {
    // Filter orders created by current account
    orders = orders.filter((o) => o.user === account);
    // Decorate orders - add display attributes
    orders = decorateMyOpenOrders(orders);
    // Sort orders by date descending
    orders = orders.sort((a, b) => b.timestamp - a.timestamp);
    return orders;
  }
);

// Order Book
export const orderBookSelector = createSelector(
  openOrders,
  data => {
    // Decorate orders
    let orders = [...data];
    orders = decorateOrderBookOrders(orders);
    // Group orders by "orderType"
    orders = groupBy(orders, 'orderType');
    //Fetch buy orders
    const buyOrders = get(orders, 'buy', []);
    // Sort buy orders by token price
    orders = {
      ...orders,
      buyOrders: buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice)
    };
    //Fetch sell orders
    const sellOrders = get(orders, 'sell', []);
    // Sort sell orders by token price
    orders = {
      ...orders,
      sellOrders: sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice)
    };
    return orders;
  }
);

// Price Chart
export const priceChartSelector = createSelector(
  filledOrders,
  data => {
    // Sort orders by date ascending to compare history
    let orders = [...data];
    orders = orders.sort((a, b) => a.timestamp - b.timestamp);
    // Decorate orders - add display attributes
    orders = orders.map((o) => decorateOrder(o));
    // Get the maximum Price
    const maxPrice = Math.max(...orders.map(order => order.tokenPrice))
    // Get last 2 orders for final price and price change
    let secondLastOrder, lastOrder;
    [secondLastOrder, lastOrder] = orders.slice(orders.length - 2, orders.length);
    // Get last order price
    const lastPrice = get(lastOrder, 'tokenPrice', 0);
    // Get second last order price
    const secondLastPrice = get(secondLastOrder, 'tokenPrice', 0);

    return({
      maxPrice,
      lastPrice,
      lastPriceChange: (lastPrice >= secondLastPrice ? '+' : '-'),      
      series: [{
        data: buildGraphData(orders)
      }]
    });
  }
);

const buildGraphData = (orders) => {
  // Group the orders by hour for the chart
  orders = groupBy(orders, (o) => moment.unix(o.timestamp).startOf('hour').format())
  // Get each hour where data exists
  const hours = Object.keys(orders);
  // Build the graph series
  const graphData = hours.map((hour) => {
    // Fetch all the orders from current hour
    const group = orders[hour];
    // Calculate price values - open, high, low, close
    const open = group[0]; // first order
    const high = maxBy(group, 'tokenPrice'); // high price
    const low = minBy(group, 'tokenPrice'); // high price
    const close = group[group.length - 1]; // last order
    return({
      x: new Date(hour),
      y: [open.tokenPrice, high.tokenPrice, low.tokenPrice, close.tokenPrice]
    });
  })
  
  return graphData;
};

