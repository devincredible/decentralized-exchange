import { useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import MyFilledOrdersContent from './MyFilledOrdersContent';
import MyOpenOrdersContent from './MyOpenOrdersContent';
import Spinner from '../../Layout/Spinner';

const MyTransactions = () => {
  const showMyFilledOrders = useSelector(state => state.orders.filledOrders.loaded);
  const allOrdersLoaded = useSelector(state => state.orders.allOrders.loaded);
  const cancelledOrdersLoaded = useSelector(state => state.orders.cancelledOrders.loaded);
  const filledOrdersLoaded = useSelector(state => state.orders.filledOrders.loaded);
  const myOpenOdersLoaded = allOrdersLoaded && cancelledOrdersLoaded && filledOrdersLoaded;
  const orderCancelling = useSelector(state => state.orders.orderCancelling);
  const showMyOpenOrders = myOpenOdersLoaded && !orderCancelling;
  
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
              {showMyFilledOrders && <MyFilledOrdersContent />}
              {!showMyFilledOrders && <Spinner type="table" />}
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
              {showMyOpenOrders && <MyOpenOrdersContent />}
              {!showMyOpenOrders && <Spinner type="table" />}
            </table>              
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default MyTransactions;