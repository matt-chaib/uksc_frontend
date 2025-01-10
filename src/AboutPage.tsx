export const AboutPage = () => {
    return(
        <div className="about-page">
            <div className="about-page-container">
            <div>
            <div>This project aims to create an environment for interactively exploring supply chain data, specifically to do with groceries and food.</div>
            <div>The project uses "Tier One" or "First Tier" supply chain data from supermarkets. Tier one suppliers are direct suppliers of supermarkets.</div>
            <div>It is not intended to be a perfect representation of the data: another aim is to demonstrate how difficult it is to work with supply chain data as it is currently published.</div>
            <div>That being said, supply chains and understanding where things come from can be inherently complicated. Many food items are prepared, and may contain ingredients that may come from various locations themselves. So the true nature of the supply chain is obscured. However, the aim of this project is to try and present as simple a view as possible of where an person's shopping has come from.</div>

            </div>

            <div>
            <div>Data sources:</div>
            <div><a href="https://www.tescoplc.com/media/asxnw5ep/2024-primary-supplier-disclosure-list-v2.pdf" target="_blank">Tesco</a></div>
            <div><a href="https://www.about.sainsburys.co.uk/sustainability/plan-for-better/our-stories/2022/increasing-transparency-in-our-supply-chain" target="_blank">Sainsburys</a></div>
            <div><a href="https://opensupplyhub.org/facilities?contributors=5209&sort_by=contributors_desc" target="_blank">Asda</a></div>
            </div>

            <div>A quick look at the above links will show you that data is not published in any standard kind of way, and is often published as a PDF.</div>
            
            
            <div>
                <div>The project <a href="https://github.com/matt-chaib/uksc-backend" target="_blank">backend</a> and <a href="https://github.com/matt-chaib/uksc_frontend" target="_blank">frontend</a> are available on GitHub.</div>
            </div>
        
        </div>
        </div>
    )
}