import { useDispatch, useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { getExchange } from '../../../instances/contracts';
import { fillOrder } from '../../../store/orders-actions';

const OrderRender = (props) => {
  const account = useSelector(state => state.web3.account);
  const networkId = useSelector(state => state.web3.networkId);
  const exchange = getExchange(networkId);  
  
  const dispatch = useDispatch();

  const fillOrderHandler = () => {
    dispatch(fillOrder(exchange, props.order, account));
  };
  
  return(
    <OverlayTrigger      
      placement='auto'
      overlay={
        <Tooltip id={props.order.id}>
          {`Click here to ${props.order.orderFillAction}`}
        </Tooltip>
      }
    >
      <tr        
        className="order-book-order"
        onClick={fillOrderHandler}
      >
        <td>{props.order.tokenAmount}</td>
        <td className={`text-${props.order.orderTypeClass}`}>{props.order.tokenPrice}</td>
        <td>{props.order.etherAmount}</td>
      </tr>
    </OverlayTrigger>
  );
};

export default OrderRender;