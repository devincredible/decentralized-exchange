import { useSelector, useDispatch } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { fillOrder } from '../../../store/orders-actions';
import { orderBookSelector } from '../../../store/orders-selectors';
import { getExchange } from '../../../instances/contracts';
import Spinner from '../../Layout/Spinner';

const OrderBook = () => {
  const networkId = useSelector(state => state.web3.networkId);
  const exchange = getExchange(networkId);
  const account = useSelector(state => state.web3.account);
  const orderBook = useSelector(state => orderBookSelector(state));  
  const allOrdersLoaded = useSelector(state => state.orders.allOrders.loaded);
  const cancelledOrdersLoaded = useSelector(state => state.orders.cancelledOrders.loaded);
  const filledOrdersLoaded = useSelector(state => state.orders.filledOrders.loaded);
  const orderFilling = useSelector(state => state.orders.orderFilling);
  const showOrderBook = allOrdersLoaded && cancelledOrdersLoaded && filledOrdersLoaded && !orderFilling;

  const dispatch = useDispatch();

  const renderOrder = (order) => {
    return(
      <OverlayTrigger 
        key={order.id}
        placement='auto'
        overlay={
          <Tooltip id={order.id}>
            {`Click here to ${order.orderFillAction}`}
          </Tooltip>
        }
      >
        <tr 
          key={order.id}
          className="order-book-order"
          onClick={(e) => dispatch(fillOrder(exchange, order, account))}
        >
          <td>{order.tokenAmount}</td>
          <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
          <td>{order.etherAmount}</td>
        </tr>
      </OverlayTrigger>
    );
  };
  
  const orderBookContent = () => {
    return(
      <tbody>
        {orderBook.sellOrders.map(order => renderOrder(order))}
        <tr>
          <th>mTC</th>
          <th>mTC/ETH</th>
          <th>ETH</th>
        </tr>
        {orderBook.buyOrders.map(order => renderOrder(order))}
      </tbody>
    );
  };

  return (
    <div className="vertical">
      <div className="card bg-dark text-white">
        <div className="card-header">
          Order Book
        </div>
        <div className="card-body order-book">
          <table className="table table-dark table-sm small">
            {showOrderBook && orderBookContent()}
            {!showOrderBook && <Spinner type="table" />}
          </table>
        </div>
      </div>
    </div>
  );  
};

export default OrderBook;