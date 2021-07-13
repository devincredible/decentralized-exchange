import { useSelector } from 'react-redux';

import { myFilledOrdersSelector } from '../../../store/orders-selectors';

const MyFilledOrdersContent = () => {
  const myFilledOrders = useSelector(state => myFilledOrdersSelector(state));
  
  return(
    <tbody>
      { myFilledOrders.map(order => {
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

export default MyFilledOrdersContent;