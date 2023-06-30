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

const HeartRateGraph = ({ data }) => {
  // Extracting the heart rates from the activity data
  console.log('1');
  console.log(data);
  const heartRates = data.heart_rate.map(activity => activity.heart_rate);
  console.log(heartRates);
  // Creating labels for the x-axis (timestamps)
  const labels = data.heart_rate.map(activity => activity.timestamp);
  console.log(labels);
  // Creating the dataset
  const dataset = {
    labels: labels,
    datasets: [
      {
        label: 'Heart Rate',
        data: heartRates,
        fill: false,
        borderColor: 'red',
        tension: 0.1
      }
    ]
  };

  // Options for customizing the graph
  const options = {
    scales: {
      x: {
        display: false,
        maxTicksLimit: 20,
      },
      y: {
        title: {
          display: true,
          text: 'Heart Rate'
        }
      }
    }
  };

  return (
    <div>
      <Line data={dataset} options={options} />
    </div>
  );
};

export default HeartRateGraph;
