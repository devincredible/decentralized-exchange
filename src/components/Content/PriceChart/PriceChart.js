import { useSelector } from 'react-redux';

import PriceChartContent from './PriceChartContent';
import Spinner from '../../Layout/Spinner';

const PriceChart = () => {
  const priceChartLoaded = useSelector(state => state.orders.filledOrders.loaded);  

  return(
    <div className="card bg-dark text-white">
    <div className="card-header">
      Price Chart
    </div>
    <div className="card-body">
      {priceChartLoaded && < PriceChartContent />}
      {!priceChartLoaded && <Spinner />}
    </div>
  </div>    
  );
};

export default PriceChart;