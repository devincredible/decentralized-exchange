import { useSelector } from 'react-redux';

import OrderBookContent from './OrderBookContent';
import Spinner from '../../Layout/Spinner';

const OrderBook = () => {    
  const allOrdersLoaded = useSelector(state => state.orders.allOrders.loaded);
  const cancelledOrdersLoaded = useSelector(state => state.orders.cancelledOrders.loaded);
  const filledOrdersLoaded = useSelector(state => state.orders.filledOrders.loaded);
  const orderFilling = useSelector(state => state.orders.orderFilling); 

  const showContent = allOrdersLoaded && cancelledOrdersLoaded && filledOrdersLoaded && !orderFilling;

  return (
    <div className="vertical">
      <div className="card bg-dark text-white">
        <div className="card-header">
          Order Book
        </div>
        <div className="card-body order-book">
          <table className="table table-dark table-sm small">
            {showContent && <OrderBookContent />}
            {!showContent && <Spinner type="table" />}
          </table>
        </div>
      </div>
    </div>
  );  
};

export default OrderBook;