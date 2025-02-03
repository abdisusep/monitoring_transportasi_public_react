import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const urlApi = 'https://api-monitoring-transportasi-public.vercel.app/';

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(urlApi);
      
      setData(response.data.jumlah_kendaraan_per_jam);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((data, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-lg font-semibold mb-2">Jam: {data.jam}</div>
              <div className="text-xl text-center text-gray-700">Jumlah Kendaraan: {data.jumlah}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;