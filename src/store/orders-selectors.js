import { createSelector } from 'reselect';
import { decorateFilledOrders } from '../helpers/decorators';

const test = state => state.orders.filledOrders.data;
export const filledOrdersSelector = createSelector(
  test,
  (data) => {       
    // Sort orders by date ascending for price comparison
    let orders = [...data];
    orders.sort((a, b) => a.timestamp - b.timestamp);
    // Decorate the  orders
    orders = decorateFilledOrders(orders);
    // Sort orders by date desdending
    orders = orders.sort((a, b) => b.timestamp - a.timestamp); 
    return orders;
});