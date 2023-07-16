import React from 'react';
import {Bar} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SleepBarGraph = ({user_data}) => {
    const sortedData = [...user_data.sleep].sort((a, b) => new Date(b.time) - new Date(a.time));
    const top10Values = sortedData.slice(0, 10);
    const sleep = top10Values.map(activity => activity.duration / 3600);
    const label = top10Values.map(activity => activity.start_time)
    const data = {
        labels: label,
        datasets: [
            {
                label: 'Hours',
                data: sleep,
                backgroundColor: '#8884d8',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    display: false,
                },
            },
        },
    };

    return (
        <Bar data={data} options={options}/>
    );
};

export default SleepBarGraph;