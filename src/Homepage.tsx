import ChoroplethMap from './ChloroplethMap'
import CountryBySupermarket from './CountryBySupermarket'
import StackedBarChart from './StackedBarChart'
import SupplierTable from './supplier_table'

export const Homepage = () => {

    return (
        <>
        {/* <div className="homepage-intro-container">
            <div className="intro-title">
                <h2>Who Makes My Food?</h2>
            </div>
        </div> */}
        <div className="homepage-container">
            <div className='chart-pair-wrapper'>
            <StackedBarChart />
            <CountryBySupermarket />
            </div>
            <ChoroplethMap />
            <SupplierTable />
        </div>
        </>
    )
}