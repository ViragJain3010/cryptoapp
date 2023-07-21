import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days, color }) => {
  const date = [];
  const prices = [];
  const data = {
    labels: date,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: prices,
        borderColor: color >= 0 ? 'rgb(0, 204, 68)' : 'rgb(255, 51, 51)',
        backgroundColor:
          color >= 0 ? 'rgba(0, 204, 68, 0.5)' : 'rgba(255, 51, 51, 0.5)',
      },
    ],
  };

  for (let i = 0; i < arr.length; i++) {
    if (days === '24h') {
      date.push(new Date(arr[i][0]).toLocaleTimeString());
    } else {
      date.push(new Date(arr[i][0]).toLocaleDateString());
    }
    prices.push(arr[i][1]);
  }

  return <Line options={{ responsive: true }} data={data} />;
};

export default Chart;
