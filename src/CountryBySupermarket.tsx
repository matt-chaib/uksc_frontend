import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';
import { supermarketColours } from './colours';
const fetchCounts = async () => {
    const response = await fetch('http://localhost:8000/business-count/2024/');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };


const CountryBySupermarket = () => {
    const { data, error, isLoading } = useQuery(['business-count', '2024'], fetchCounts);

    console.log(data)

    const sorted_data = data ? [...data].sort((a, b) => (b.Asda + b.Sainsburys + b.Tesco) - (a.Asda + a.Sainsburys + a.Tesco)) : [];


  const businesses = ["Asda", "Tesco", "Sainsburys"]

  return (
    <div className='chart-wrapper'>
    <h2>Suppliers by country, coloured by supermarket.</h2>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={sorted_data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />

        {businesses.map((business, index) => (
          <Bar key={business + String(index)} dataKey={business} stackId="a" fill={supermarketColours[business]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default CountryBySupermarket;
