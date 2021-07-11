import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';

import Spinner from '../Layout/Spinner';
import { chartOptions } from '../../helpers/priceChart.config';
import { priceChartSelector } from '../../store/orders-selectors';

const PriceChart = () => {
  const priceChartLoaded = useSelector(state => state.orders.filledOrders.loaded);
  const priceChart = useSelector(state => priceChartSelector(state));
  
  const priceSymbol = (lastPriceChange) => {
    let output;
    if(lastPriceChange === '+') {
      output = <span className="text-success">&#9650;</span> // green up triangle
    } else {
      output = <span className="text-danger">&#9660;</span> // red down triangle
    }
  
    return output;
  };
  
  const showPriceChart = (priceChart) => {
    chartOptions.yaxis.max = priceChart.maxPrice * 1.1;
  
    return(
      <div className="price-chart">
        <div className="price">
          <h4>mTC/ETH &nbsp; {priceSymbol(priceChart.lastPriceChange)} &nbsp; {priceChart.lastPrice}</h4>
        </div>
        <Chart options={chartOptions} series={priceChart.series} type="candlestick" width="100%" height="100%" />
      </div>
    );
  };

  return(
    <div className="card bg-dark text-white">
    <div className="card-header">
      Price Chart
    </div>
    <div className="card-body">
      {priceChartLoaded && showPriceChart(priceChart)}
      {!priceChartLoaded && <Spinner />}
    </div>
  </div>    
  );
};

export default PriceChart;