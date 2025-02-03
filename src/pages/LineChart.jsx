import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const urlApi = 'https://api-monitoring-transportasi-public.vercel.app/';

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(urlApi);
      const resDate = response.data.tanggal;
      const chartData = {
        labels: response.data.jumlah_kendaraan_per_jam.map((item) => item.jam),
        datasets: [
          {
            label: 'Jumlah Kendaraan per Jam',
            data: response.data.jumlah_kendaraan_per_jam.map((item) => item.jumlah),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      };
      
      setData(chartData);
      setDate(resDate);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Jumlah Kendaraan per Jam pada ${date}`,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Jumlah: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto mt-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600"></div>
        </div>
      ) : (
        <div>
          <h1>Chart Lalu Lintas</h1>
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default LineChart;