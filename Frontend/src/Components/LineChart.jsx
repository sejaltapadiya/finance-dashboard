import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const CreditScoreTrend = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:9192/credit-score-trend')
            .then(response => {
                console.log('API Data:', response.data); // Debug API response
                setData(response.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again later.');
            });
    }, []);

    // Prepare chart data
    const chartData = {
        labels: data.map(item => item.date), // Map dates
        datasets: [
            {
                label: 'Average Credit Score',
                data: data.map(item => item.average_credit_score), // Map average credit scores
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointRadius: 3,
                fill: false,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Average Credit Score Trend',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0, // Start y-axis from 0
            },
        },
    };

    return (
        <div>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <Line data={chartData} options={options} />
            )}
        </div>
    );
};

export default CreditScoreTrend;
