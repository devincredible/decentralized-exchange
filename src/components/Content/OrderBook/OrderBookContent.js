import { useSelector } from 'react-redux';

import OrderRender from './OrderRender';
import { orderBookSelector } from '../../../store/orders-selectors';

const OrderBookContent = () => {  
  const orderBook = useSelector(state => orderBookSelector(state));
  
  return(
    <tbody>
      {orderBook.sellOrders.map(order => <OrderRender key={order.id} order={order}/>)}
      <tr>
        <th>mTC</th>
        <th>mTC/ETH</th>
        <th>ETH</th>
      </tr>
      {orderBook.buyOrders.map(order => <OrderRender key={order.id} order={order}/>)}
    </tbody>
  );
};

export default OrderBookContent;