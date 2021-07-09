import { get, reject, groupBy } from 'lodash';
import { createSelector } from 'reselect';
import { decorateFilledOrders, decorateOrderBookOrders, decorateMyFilledOrders, decorateMyOpenOrders } from '../helpers/decorators';

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

// Create the Order Book
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

