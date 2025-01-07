
import './App.css'
import ChoroplethMap from './ChloroplethMap'
import CountryCountsChart from './CountryCountsChart'
import StackedBarChart from './StackedBarChart'
import SupplierTable from './supplier_table'

function App() {

  return (
    <>
      <div>
        <SupplierTable />
        <StackedBarChart />
        {/* <CountryCountsChart /> */}
        <ChoroplethMap />
      </div>
    </>
  )
}

export default App
