import ChoroplethMap from './ChloroplethMap'
import CountryBySupermarket from './CountryBySupermarket'
import CountryCountsChart from './CountryCountsChart'
import StackedBarChart from './StackedBarChart'
import SupplierTable from './supplier_table'

export const Homepage = () => {

    return (
        <>
            <SupplierTable />
            <StackedBarChart />
            <CountryBySupermarket />
            <ChoroplethMap />
        </>
    )
}