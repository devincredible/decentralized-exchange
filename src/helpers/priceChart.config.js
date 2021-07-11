export const chartOptions = {
  chart: {
    animations: { enabled: false },
    toolbar: { show: false },
    width: '100px'
  },
  tooltip: {
    enabled: true,
    theme: false,
    style: {
      fontSize: '12px',
      fontFamily: undefined
    },
    x: {
      show: false,
      format: 'dd MMM',
      formatter: undefined
    },
    y: {
      show: true,
      title: 'price'
    },
    marker: {
      show: false
    },
    items: {
      display: 'flex'
    },
    fixed: {
      enabled: false,
      position: 'topRight',
      offsetX: 0,
      offsetY: 0
    },    
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: true,
      style: {
        colors: '#fff',
        fontSize: '8px',
        cssClass: 'apexcharts-xaxis-label'
      },
    },
  },
  yaxis: {
    labels: {      
      show: true,
      minWidth: 0,
      maxWidth: 160,
      style: {
        colors: '#fff',
        fontSize: '8px',
        cssClass: 'apexcharts-yaxis-label'
      },
      offsetX: 0,
      offsetY: 0,
      rotate: 0      
    }
  }
};