import { useSelector } from 'react-redux';

import TradesContent from './TradesContent';
import Spinner from '../../Layout/Spinner';

const Trades = () => {
  const filledOrdersLoaded = useSelector(state => state.orders.filledOrders.loaded); 
  
  return (
    <div className="vertical">
      <div className="card bg-dark text-white">
        <div className="card-header">
          Trades
        </div>
        <div className="card-body">
          <table className="table table-dark table-sm small">
            <thead>
              <tr>
                <th>Time</th>
                <th>mTC</th>
                <th>mTC/ETH</th>
              </tr>
            </thead>
            {filledOrdersLoaded && <TradesContent />}
            {!filledOrdersLoaded && <Spinner type="table" />}       
          </table>
        </div>
      </div>
    </div>
  ); 
 };

export default Trades;
