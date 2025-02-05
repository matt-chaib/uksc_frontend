export const AboutPage = () => {
    return(
        <div className="about-page">
            <div className="about-page-container">
            <h2>Who makes my food?</h2>
            <div>
            <div>This project interactively explores food and grocery supply chain data in the UK.</div>
            <div>It uses "Tier One" or "First Tier" supply chain data from supermarkets. Tier one suppliers are direct suppliers of supermarkets.</div>
            <div>It is not intended to be a perfect representation of the data: another aim is to demonstrate how difficult it is to work with supply chain data as it is currently published.</div>
            <div>That being said, supply chains and understanding where things come from can be inherently complicated. Many food items are prepared, and may contain ingredients that may come from various locations themselves. So the true nature of the supply chain is obscured. However, the aim of this project is to try and present as simple a view as possible of where an person's shopping has come from.</div>

            </div>
            
            <h3>How is the data collected?</h3>
            <div>A quick look at the data source links will show you that data is not published in any standard kind of way, and is often published as a PDF.</div>
            <div>PDF data is scraped using Python libraries in a semi-automated script, although some manual error correction is needed.</div>
            <div>Changes made to the data include:</div>
            <ul>
                <li>Renaming countries to standard names so that they match between datasets.</li>
            </ul>
            <div>Challenges include:</div>
            <ul>
                <li>Parsing the number of workers.</li>
                <li>Parsing the sector the supplier operates in.</li>
            </ul>
            <div>Parsing the sector is particularly challenging for several reasons. Firstly, there is no standard set of sectors which suppliers can be defined as. Secondly sectors listed by supermarkets can be ambiguous and refer to more than one type of product. For example, the sector "Food" could refer to the supply of groceries or the supply of grocery packaging. The sector might also be missing from the data entirely, or for a significant number of suppliers.</div>
            <div>As a result of this challenge, the Asda dataset includes suppliers from all sectors, whereas Tesco and Sainsburys provided PDFs specifically for food and grocery suppliers, which at least allows for broad categorisation.</div>
            <div>
            <div>Data sources:</div>
            <ul>
            <li><a href="https://www.tescoplc.com/media/asxnw5ep/2024-primary-supplier-disclosure-list-v2.pdf" target="_blank">Tesco</a></li>
            <li><a href="https://www.about.sainsburys.co.uk/sustainability/plan-for-better/our-stories/2022/increasing-transparency-in-our-supply-chain" target="_blank">Sainsburys</a></li>
            <li><a href="https://opensupplyhub.org/facilities?contributors=5209&sort_by=contributors_desc" target="_blank">Asda</a></li>
            </ul>
            </div>
            
            <h3>What technologies does the website use?</h3>
            <div>The project uses Python (Django) and Postgres to import, clean, store and serve the supply chain data. The front-end is built with React and Typescript, and uses Recharts, Leaflet and AG-Grid for interactive charts, maps and tables.</div>
            <div>
                <div>The project <a href="https://github.com/matt-chaib/uksc-backend" target="_blank">backend</a> and <a href="https://github.com/matt-chaib/uksc_frontend" target="_blank">frontend</a> are available to see on GitHub.</div>
            </div>
        
        </div>
        </div>
    )
}