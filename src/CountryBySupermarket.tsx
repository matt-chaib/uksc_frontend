import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';
import { supermarketColours } from './colours';

interface SupermarketData {
  country: string;
  Asda: number;
  Tesco: number;
  Sainsburys: number;
  [key: string]: string | number; // To handle dynamic keys for supermarkets
}

const fetchCounts = async (): Promise<SupermarketData[]> => {
    const response = await fetch('http://localhost:8000/business-count/2024/');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };


const CountryBySupermarket = () => {
    const { data, error, isLoading } = useQuery<SupermarketData[], Error>(['business-count', '2024'], fetchCounts);
    const [showCommon, setShowCommon] = useState<boolean>(false);
    const [sortedData, setSortedData] = useState<SupermarketData[] | undefined>(undefined);
    console.log(data)

    useEffect(() => {
      let tempDat = data ? [...data].sort((a, b) => (b.Asda + b.Sainsburys + b.Tesco) - (a.Asda + a.Sainsburys + a.Tesco)) : []
      if (showCommon && data) {
        tempDat = tempDat.slice(0, 15)
      }
      setSortedData(tempDat)
    }, [data, showCommon])


    const businesses: (keyof typeof supermarketColours)[] = ["Asda", "Tesco", "Sainsburys"];

  return (
    <div className='chart-wrapper'>
      <div>
      <h2>Suppliers by country, coloured by supermarket.</h2>
      </div>
      <div style={{alignSelf: 'flex-start', paddingLeft: '2rem'}}><button onClick={() => setShowCommon(!showCommon)}>{showCommon ? "Show All" : "Show Top 15"}</button></div>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={sortedData}>
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
