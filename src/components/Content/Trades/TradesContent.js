import { useSelector } from 'react-redux';

import { filledOrdersSelector } from '../../../store/orders-selectors';

const TradesContent = () => {
  const filledOrders = useSelector(state => filledOrdersSelector(state));
  
  return (
    <tbody>
      {filledOrders.map(order => {
        return(            
          <tr className={`order-${order.id}`} key={order.id}>
            <td className="text-muted">{order.formattedTimestamp}</td>
            <td>{order.tokenAmount}</td>
            <td className={`text-${order.tokenPriceClass}`}>{order.tokenPrice}</td>
          </tr>          
        );
      })}
    </tbody>
  );
};

export default TradesContent;