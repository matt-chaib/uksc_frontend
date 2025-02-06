import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';
import {colourPalette} from './colours'

const fetchCounts = async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}/country-count-business/2024/`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };

  const fetchCountryCounts = async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}/country-count/2024/`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };


const StackedBarChart = () => {
    const { data, error, isLoading } = useQuery('country-count-business', fetchCounts);
    const { data: ccData, error: ccError, isLoading: ccLoading } = useQuery('country-count', fetchCountryCounts);


    console.log(data)

    const sorted_data = ccData ? [...ccData].sort((a, b) => b.count - a.count) : [];


  // List of countries (keys of the data object excluding 'source_business')
  const uniqueCountries = sorted_data.map(d => d.country).slice(0,9)
//   const uniqueCountries = data && [...new Set(data.map(item => item.country))];

  return (
    <div className='chart-wrapper'>
      <h2>Suppliers by supermarket, coloured by country.</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="source_business" />
          <YAxis />
          <Tooltip />
          <Legend />

          {uniqueCountries && uniqueCountries.map((country, index) => (
            <Bar key={country + String(index)} dataKey={country} stackId="a" fill={colourPalette[index]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
