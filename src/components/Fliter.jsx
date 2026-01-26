import { useState } from 'react'
import './Fliter.css'

function Fliter({filter,setFilter}){
    // const [filter, setFilter] = useState(1);    
    return(
        <div className="main">
            <div class="radio-inputs">
                <label className={`radio ${filter === 1 ? 'active' : ''}`}>
                    <input checked={filter === 1}
            onChange={() => setFilter(1)} name="radio" type="radio" />
                    <span class="name">This Day</span>
                </label>
                <label className={`radio ${filter === 2 ? 'active' : ''}`}>
                    <input checked={filter === 2}
            onChange={() => setFilter(2)} name="radio" type="radio" />
                    <span class="name">This Week</span>
                </label>
                <label className={`radio ${filter === 3 ? 'active' : ''}`}>
                    <input checked={filter === 3}
            onChange={() => setFilter(3)} name="radio" type="radio" />
                    <span class="name">Third</span>
                </label>
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