
import './App.css'
import ChoroplethMap from './ChloroplethMap'
import CountryBySupermarket from './CountryBySupermarket'
import CountryCountsChart from './CountryCountsChart'
import StackedBarChart from './StackedBarChart'
import SupplierTable from './supplier_table'

function App() {

  return (
    <>
      <div>
        <SupplierTable />
        <StackedBarChart />
        <CountryBySupermarket />
        <ChoroplethMap />
      </div>
    </>
  )
}

export default App
