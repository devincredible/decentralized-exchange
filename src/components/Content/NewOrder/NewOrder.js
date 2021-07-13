import { useSelector } from 'react-redux';

import NewOrderContent from './NewOrderContent';
import Spinner from '../../Layout/Spinner';

const NewOrder = () => {
  const orderBuying = useSelector(state => state.orders.orderBuying);
  const orderSelling = useSelector(state => state.orders.orderSelling);

  const showContent = !orderBuying && !orderSelling;  
  
  return(
    <div className="card bg-dark text-white">
      <div className="card-header"> 
        New Order
      </div>
      <div className="card-body">
        {showContent && <NewOrderContent />}
        {!showContent && <Spinner />}
      </div>
    </div>
  );
};

export default NewOrder;