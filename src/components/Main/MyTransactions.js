import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import Spinner from '../Layout/Spinner';
import { myFilledOrdersSelector, myOpenOrdersSelector } from '../../store/orders-selectors';
import { cancelOrder } from '../../store/orders-actions';
import { getExchange } from '../../instances/contracts';

const MyTransactions = () => {
  const networkId = useSelector(state => state.web3.networkId);
  const exchange = getExchange(networkId);
  const account = useSelector(state => state.web3.account);
  const showMyFilledOrders = useSelector(state => state.orders.filledOrders.loaded);
  const allOrdersLoaded = useSelector(state => state.orders.allOrders.loaded);
  const cancelledOrdersLoaded = useSelector(state => state.orders.allOrders.loaded);
  const filledOrdersLoaded = useSelector(state => state.orders.allOrders.loaded);
  const myOpenOdersLoaded = allOrdersLoaded && cancelledOrdersLoaded && filledOrdersLoaded;
  const orderCancelling = useSelector(state => state.orderCancelling);
  const showMyOpenOrders = myOpenOdersLoaded && !orderCancelling;
  const myFilledOrders = useSelector(state => myFilledOrdersSelector(state));
  const myOpenOrders = useSelector(state => myOpenOrdersSelector(state));
  
  const dispatch = useDispatch();

  const myFilledOrdersContent = () => {
    return(
      <tbody>
        { myFilledOrders.map((order) => {
          return(
            <tr key={order.id}>
              <td className="text-muted">{order.formattedTimestamp}</td>
              <td className={`text-${order.orderTypeClass}`}>{order.orderSign}{order.tokenAmount}</td>
              <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
            </tr>
          );
        }) }
      </tbody>
    );
  };
  
  const myOpenOrdersContent = () => {
    return(
      <tbody>
        { myOpenOrders.map((order) => {
          return(
            <tr key={order.id}>            
              <td className={`text-${order.orderTypeClass}`}>{order.tokenAmount}</td>
              <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
              <td 
                className="text-muted cancel-order"
                onClick={(e) => {
                  dispatch(cancelOrder(exchange, order, account))
                }}
              >X</td>
            </tr>
          );
        }) }
      </tbody>
    );
  };
  
  return(
    <div className="card bg-dark text-white">
      <div className="card-header">
        My Transactions
      </div>
      <div className="card-body">
        <Tabs defaultActiveKey="trades" className="bg-dark text-white">
          <Tab eventKey="trades" title="Trades" className="bg-dark">
            <table className="table table-dark table-sm small">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>mTC</th>
                  <th>mTC/ETH</th>
                </tr>
              </thead>
              {showMyFilledOrders ? myFilledOrdersContent() : <Spinner type="table" />}
            </table>
          </Tab>
          <Tab eventKey="orders" title="Orders">
            <table className="table table-dark table-sm small">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>mTC/ETH</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              {showMyOpenOrders ? myOpenOrdersContent() : <Spinner type="table" />}
            </table>              
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default MyTransactions;