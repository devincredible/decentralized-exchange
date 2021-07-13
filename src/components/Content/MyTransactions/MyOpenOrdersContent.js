import { useDispatch, useSelector } from 'react-redux';

import { myOpenOrdersSelector } from '../../../store/orders-selectors';
import { cancelOrder } from '../../../store/orders-actions';
import { getExchange } from '../../../instances/contracts';

const MyOpenOrdersContent = () => {  
  const account = useSelector(state => state.web3.account);
  const networkId = useSelector(state => state.web3.networkId);
  const exchange = getExchange(networkId);  
  const myOpenOrders = useSelector(state => myOpenOrdersSelector(state));

  const dispatch = useDispatch();
  
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

export default MyOpenOrdersContent;