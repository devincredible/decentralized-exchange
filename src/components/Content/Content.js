import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadAllOrders, subscribeEventsOrders } from '../../store/orders-actions';
import { subscribeEventsExchange } from '../../store/exchange-actions';
import { getToken, getExchange } from '../../instances/contracts';
import web3 from '../../instances/connection';
import Trades from './Trades/Trades';
import OrderBook from './OrderBook/OrderBook';
import MyTransactions from './MyTransactions/MyTransactions';
import PriceChart from './PriceChart/PriceChart';
import Balance from './Balance/Balance';
import NewOrder from './NewOrder/NewOrder';

const Content = () => {  
  const account = useSelector(state => state.web3.account);
  const networkId = useSelector(state => state.web3.networkId);  
  const token = getToken(networkId);
  const exchange = getExchange(networkId);  

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadAllOrders(exchange));
    dispatch(subscribeEventsOrders(exchange));
    dispatch(subscribeEventsExchange(exchange, token, web3, account));
  }, []);
  
  return(
    <div className="content">
      <div className="vertical-split">
        <Balance />
        <NewOrder />       
      </div>
      <OrderBook />
      <div className="vertical-split">
        <PriceChart />
        <MyTransactions />
      </div>
      <Trades />
    </div>
  ); 
};

export default Content;


