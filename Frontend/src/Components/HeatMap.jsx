import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MatrixElement } from 'chartjs-chart-matrix';
import { Chart as ChartJS, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(LinearScale, MatrixElement, Title, Tooltip, Legend);

const NumberOfDependentsHeatmap = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9192/api/dependents-default')
            .then(response => setData(response.data))
            .catch(error => console.error('Error:', error));
    }, []);

    const chartData = {
        datasets: [{
            label: 'Dependents vs Default Rate',
            data: data.map(item => ({
                x: item.num_dependents,
                y: item.default_rate,
                v: item.default_rate * 100
            })),
            backgroundColor: ctx => {
                const value = ctx.dataset.data[ctx.dataIndex].v;
                return value > 50 ? 'red' : 'green';
            },
            borderWidth: 1
        }]
    };

    return <Chart type="matrix" data={chartData} />;
};

export default NumberOfDependentsHeatmap;
