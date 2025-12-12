import './Fliter.css'

function Fliter(){
    return(
        <div className="main">
            <div className='filter'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 4h18l-7 8v7l-4 2v-9L3 4z"/>
                </svg>
                <p>Fliter</p>

            </div>
            <div className='search'>
                <input type="text" placeholder='Search' className='search-input'/>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Search">
                    <circle cx="11" cy="11" r="5.2"></circle>
                    <path d="M20 20l-3.5-3.5"></path>
                </svg>
            </div>
        </div>
    )
}
export default Fliter