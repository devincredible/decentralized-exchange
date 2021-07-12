import { ordersActions } from './orders-slice';
import { ETHER_ADDRESS } from '../helpers/utils';

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

export const subscribeEventsOrders = (exchange) => {  
  return async(dispatch) => {    
    exchange.events.Cancel({}, (error, event) => {
      let eventResult = JSON.parse(JSON.stringify(event.returnValues)); // Transform the instance in a plain object for Redux
      dispatch(ordersActions.cancelledOrder(eventResult));
    });

    exchange.events.Trade({}, (error, event) => {
      let eventResult = JSON.parse(JSON.stringify(event.returnValues)); // Transform the instance in a plain object for Redux
      dispatch(ordersActions.filledOrder(eventResult));
    });

    exchange.events.Order({}, (error, event) => {
      let eventResult = JSON.parse(JSON.stringify(event.returnValues)); // Transform the instance in a plain object for Redux
      dispatch(ordersActions.orderMade(eventResult));
    });
  }  
};

export const fillOrder = (exchange, order, account) => {
  return async(dispatch) => {
    exchange.methods.fillOrder(order.id).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch(ordersActions.orderFilling())
    })
    .on('error', (error) => {
      console.log(error);
      window.alert('There was an error...')
    })
  }
};

export const cancelOrder = (exchange, order, account) => {
  return async(dispatch) => {
    exchange.methods.cancelOrder(order.id).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch(ordersActions.orderCancelling());
    })
    .on('error', (error) => {
      console.log(error);
      window.alert('There was an error...');
    })
  }
};

export const makeBuyOrder = (exchange, token, web3, orderAmount, orderPrice, account) => {
  return async(dispatch) => {
    const tokenGet = token.options.address;
    const amountGet = web3.utils.toWei(orderAmount, 'ether');
    const tokenGive = ETHER_ADDRESS;
    const amountGive = web3.utils.toWei((orderAmount * orderPrice).toString(), 'ether');
  
    exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch(ordersActions.buyOrderMaking());
    })
    .on('error', (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    })
  }
};

export const makeSellOrder = (exchange, token, web3, orderAmount, orderPrice, account) => {
  return async(dispatch) => {
    const tokenGive = token.options.address;
    const amountGive = web3.utils.toWei(orderAmount, 'ether');
    const tokenGet = ETHER_ADDRESS;
    const amountGet = web3.utils.toWei((orderAmount * orderPrice).toString(), 'ether');
  
    exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch(ordersActions.sellOrderMaking());
    })
    .on('error', (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    })
  }
};



