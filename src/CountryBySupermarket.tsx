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
    const response = await fetch(`${import.meta.env.BASE_URL}/business-count/2024/`);
    
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
    const showAllLabels: boolean = sortedData ? sortedData.length <= 15 : false;

  return (
<div className='chart-wrapper'>
  <h2>Suppliers by country, coloured by supermarket.</h2>
  <ResponsiveContainer width="100%" height={"80%"}>
    <BarChart data={sortedData} margin={{ top: 0, right: 30, left: 40, bottom: 70 }} >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="country" 
        angle={-28}  // Rotates the labels 45 degrees
        textAnchor="end"  // Adjusts the anchor point for better alignment
        interval={showAllLabels ? 0 : 'preserveStartEnd'} // Shows all labels if fewer than 15 bars, else optimizes spacing
      />
      <YAxis />
      <Tooltip />
      <Legend layout="horizontal" 
  verticalAlign="bottom" 
  align="center" 
  wrapperStyle={{ paddingTop: 50 }}/>
      
      {businesses.map((business, index) => (
        <Bar 
          key={business + String(index)} 
          dataKey={business} 
          stackId="a" 
          fill={supermarketColours[business]} 
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
  <div style={{alignSelf: 'flex-start', paddingLeft: '3rem'}}>
    <button onClick={() => setShowCommon(!showCommon)}>
      {showCommon ? "Show all countries" : "Show Top 15"}
    </button>
  </div>
</div>
  );
};

export default CountryBySupermarket;
