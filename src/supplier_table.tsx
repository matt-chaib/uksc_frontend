import React from 'react';
import { useQuery } from 'react-query';

const fetchSuppliers = async () => {
  const response = await fetch('http://localhost:8000/suppliers-head/');
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

const SupplierTable = () => {
  const { data, error, isLoading } = useQuery('suppliers', fetchSuppliers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <h2>Supplier List</h2>
      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Address</th>
            <th>Country</th>
            <th>Workers</th>
            <th>Sector</th>
            <th>Year</th>
            <th>Source Business</th>
          </tr>
        </thead>
        <tbody>
          {data.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.supplier}</td>
              <td>{supplier.address}</td>
              <td>{supplier.country}</td>
              <td>{supplier.workers}</td>
              <td>{supplier.sector}</td>
              <td>{supplier.year}</td>
              <td>{supplier.source_business}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;
