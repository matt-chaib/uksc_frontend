import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';

const fetchCounts = async () => {
    const response = await fetch('http://localhost:8000/country-count-business/2024/');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };

  const fetchCountryCounts = async () => {
    const response = await fetch('http://localhost:8000/country-count/2024/');
    
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

const transformedData = data && data.reduce((acc, { source_business, country, country_count }) => {
    // Find if the source_business already exists in the accumulator
    let supermarket = acc.find(item => item.source_business === source_business);
  
    // If the supermarket doesn't exist, create a new one
    if (!supermarket) {
      supermarket = { source_business, ...Object.fromEntries(uniqueCountries.map(c => [c, 0])) };
      acc.push(supermarket);
    }
  
    // Set the country count for the current country
    supermarket[country] = country_count;
  
    return acc;
  }, []);
  console.log("Transformed data", transformedData)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="source_business" />
        <YAxis />
        <Tooltip />
        <Legend />

        {uniqueCountries && uniqueCountries.map((country, index) => (
          <Bar key={country + String(index)} dataKey={country} stackId="a" fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
