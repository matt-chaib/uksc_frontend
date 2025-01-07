
import './App.css'
import CountryCountsChart from './CountryCountsChart'
import StackedBarChart from './StackedBarChart'
import SupplierTable from './supplier_table'

function App() {

  return (
    <>
      <div>
        <SupplierTable />
        <StackedBarChart />
        <CountryCountsChart />
      </div>
    </>
  )
}

export default App
