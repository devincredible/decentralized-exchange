import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';

import { priceChartSelector } from '../../../store/orders-selectors';
import { chartOptions } from '../../../helpers/priceChart.config';

const PriceChartContent = () => {
  const priceChart = useSelector(state => priceChartSelector(state));
  
  chartOptions.yaxis.max = priceChart.maxPrice * 1.1;

  const priceSymbol = (lastPriceChange) => {
    let output;
    if(lastPriceChange === '+') {
      output = <span className="text-success">&#9650;</span> // green up triangle
    } else {
      output = <span className="text-danger">&#9660;</span> // red down triangle
    }
  
    return output;
  };

  return(
    <div className="price-chart">
      <div className="price">
        <h4>mTC/ETH &nbsp; {priceSymbol(priceChart.lastPriceChange)} &nbsp; {priceChart.lastPrice}</h4>
      </div>
      <Chart options={chartOptions} series={priceChart.series} type="candlestick" width="100%" height="100%" />
    </div>
  );
};

export default PriceChartContent;