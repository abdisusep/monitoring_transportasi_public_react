import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const urlApi = 'https://api-monitoring-transportasi-public.vercel.app/';

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(urlApi);
      const resDate = response.data.tanggal;
      
      setData(response.data.jumlah_kendaraan_per_jam);
      setDate(resDate);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto mt-8 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600"></div>
        </div>
      ) : (
        <div>
          <h1 className="mb-5 text-2xl font-semibold">Card</h1>
          <p className="text-center mb-4">Jumlah Kendaraan per Jam pada {date}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((data, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">{data.jam}</span>
                <p class="mt-2 max-w-lg max-lg:text-center">Jumlah Kendaraan: {data.jumlah}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;