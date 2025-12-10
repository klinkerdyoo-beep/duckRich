import { useState } from 'react';
import './HambergerBar.css';
import logo from '../assets/Logo.png';
import IconDbBlack from '../assets/IconDashboardBlack.png';
import IconDb from '../assets/IconDashboard.png';
import IconANBlack from '../assets/IconAddNewBlack.png';
import IconAN from '../assets/IconAddNew.png';
import IconNBlack from '../assets/IconNoteBlack.png';
import IconN from '../assets/IconNote.png';
import IconCBlack from '../assets/IconCategoryBlack.png';
import IconC from '../assets/IconCategory.png';


function HambergerBar() {
   const [open, setOpen] = useState(true)
   const [hover, setHover] =  useState(null);

    return(
        <div className="hambar-container" >
         <div className={`hamburger ${open ? "open" : ""}`}
         onClick={() => setOpen(!open)}>
            <span></span>
            <span></span>
            <span></span>
         </div>

         <div className={`sidebar ${open ? "show" : ""}`}>
            <img src={logo} alt="" />
             <button className='b1' 
               onMouseEnter={() => setHover("db") }
               onMouseLeave={() => setHover(null)}>
                  {hover === "db" ?  <img src={IconDb}/> :  <img src={IconDbBlack}/>}
                <h2>Dashboard</h2>
             </button>
             <button className='b1'
               onMouseEnter={() => setHover("an") }
               onMouseLeave={() => setHover(null)}>
                  {hover === "an" ? <img src={IconAN}/> : <img src={IconANBlack}/>}
                <h2>Create Daily Record</h2>
             </button>
             <button className='b1'
               onMouseEnter={() => setHover("n") }
               onMouseLeave={() => setHover(null)}>
                  {hover === "n" ? <img src={IconN}/> : <img src={IconNBlack}/>}
                <h2>Daily Record</h2>
             </button>
             <button className='b1'
               onMouseEnter={() => setHover("c") }
               onMouseLeave={() => setHover(null)}>
                  {hover === "c" ? <img src={IconC}/> : <img src={IconCBlack}/>}
                <h2> Manage Category</h2>
             </button>
         </div>
        </div>
    )
}
export default HambergerBar