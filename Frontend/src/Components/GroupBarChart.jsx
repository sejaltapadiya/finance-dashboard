import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmploymentStatusBarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9192/api/employment-status', { withCredentials: true })
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const chartData = {
        labels: data.map(item => item.employment_status),
        datasets: [
            {
                label: 'Default Rate',
                data: data.map(item => item.default_rate),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            }
        ]
    };

    return <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Employment Status vs Default Rate' } } }} />;
};

export default EmploymentStatusBarChart;
