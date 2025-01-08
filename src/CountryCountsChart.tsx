import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';

const fetchCounts = async () => {
    const response = await fetch('http://localhost:8000/country-count/2024/');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };

const CountryCountsChart = () => {
    const { data, error, isLoading } = useQuery('country-count', fetchCounts);

    const uniqueCountries = data && [...new Set(data.map(item => item.country))]
    console.log(data)

    const sorted_data = data ? [...data].sort((a, b) => b.count - a.count) : [];

  return (
    <ResponsiveContainer width="100%" height={600}>
    <BarChart data={sorted_data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="country" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" key={sorted_data?.id} fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);
};

export default CountryCountsChart;
