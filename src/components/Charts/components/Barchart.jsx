import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const Barchart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          'United States', 'China', 'Germany'
        ],
      }
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div id="chart" ref={chartRef}></div>
  );
};

export default Barchart;
