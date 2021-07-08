import { ordersActions } from './orders-slice';

export const loadAllOrders = (exchange) => {  
  return async(dispatch) => {
    // Fetch cancelled orders with the "Cancel" event stream
    const cancelStream = await exchange.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest' });
    let cancelledOrders = cancelStream.map(event => event.returnValues);    
    cancelledOrders = JSON.parse(JSON.stringify(cancelledOrders)); // Transform the instance in a plain object for Redux
    dispatch(ordersActions.fetchCancelledOrders(cancelledOrders));
    
    // Fetch filled orders with the "Trade" event stream
    const tradeStream = await exchange.getPastEvents('Trade', { fromBlock: 0, toBlock: 'latest' });
    let filledOrders = tradeStream.map(event => event.returnValues);
    filledOrders = JSON.parse(JSON.stringify(filledOrders)); // Transform the instance in a plain object for Redux
    dispatch(ordersActions.fetchFilledOrders(filledOrders));

    // Fetch all orders with the "Order" event stream
    const orderStream = await exchange.getPastEvents('Order', { fromBlock: 0, toBlock: 'latest' });
    let allOrders = orderStream.map(event => event.returnValues);
    allOrders = JSON.parse(JSON.stringify(allOrders)); // Transform the instance in a plain object for Redux
    dispatch(ordersActions.fetchAllOrders(allOrders));
  }
};

// export const subscribeToEvents = (exchange) => {  
//   return async(dispatch) => {
//     exchange.events.Cancel({}, (error, event) => {
//       dispatch(ordersActions.cancelledOrder(event.returnValues));
//     });
    
//     exchange.events.Trade({}, (error, event) => {
//       dispatch(ordersActions.filledOrder(event.returnValues))
//     });
//   }  
// };

