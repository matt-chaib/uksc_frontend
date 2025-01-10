import ChoroplethMap from './ChloroplethMap'
import CountryBySupermarket from './CountryBySupermarket'
import CountryCountsChart from './CountryCountsChart'
import StackedBarChart from './StackedBarChart'
import SupplierTable from './supplier_table'

export const Homepage = () => {

    return (
        <div className="homepage-container">
            <ChoroplethMap />
            <SupplierTable />
            <div className='chart-pair-wrapper'>
            <StackedBarChart />
            <CountryBySupermarket />
            </div>
        </div>
    )
}