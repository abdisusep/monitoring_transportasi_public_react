import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
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
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
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
    <div className="mx-auto mt-8 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600"></div>
        </div>
      ) : (
        <div>
          <h1 className="mb-5 text-2xl font-semibold">Bar Chart</h1>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default BarChart;