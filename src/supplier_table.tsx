import React from 'react';
import { useQuery } from 'react-query';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core Grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const fetchSuppliers = async () => {
  const response = await fetch('http://localhost:8000/all');
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

const SupplierTable = () => {
  const { data, error, isLoading } = useQuery('suppliers', fetchSuppliers);

  const columnDefs = [
    { headerName: 'Supplier', field: 'supplier' },
    { headerName: 'Address', field: 'address' },
    { headerName: 'Country', field: 'country' },
    { headerName: 'Workers', field: 'workers' },
    { headerName: 'Sector', field: 'sector' },
    { headerName: 'Year', field: 'year' },
    { headerName: 'Source Business', field: 'source_business' },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className='supplier-data-table'>
      <h2>Supplier List</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{ sortable: true, filter: true }}
        />
      </div>
    </div>
  );
};

export default SupplierTable;
