import { useState } from 'react';
import { Link } from "react-router-dom";  
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


function HambergerBar({page, setPage}) {
   const [open, setOpen] = useState(true)
   const [hover, setHover] =  useState(null);

      return(
         <div className="hambar-container" >
            <div className={`hamburger ${open ? "open" : ""}`}
            onClick={() => {
               setOpen(!open);
               document.body.classList.toggle("sidebar-open");
            }}>
               <span></span>  
               <span></span>
               <span></span>
            </div>

         <div className={`sidebar ${open ? "show" : ""}`}>
            <Link to={'/'}>
               <img src={logo} className='logo' />
            </Link>
            <Link to="/" onClick={() => setPage("Home")}>
               <button className={`b1 ${page === "Home" ? "active" : ""} }`}
                  onMouseEnter={() => setHover("db") }
                  onMouseLeave={() => setHover(null)}>
                     {hover === "db" || page === "Home" ?  <img src={IconDb}/> :  <img src={IconDbBlack}/>}
                  <h2>Dashboard</h2>
               </button>
            </Link>
             <Link to="/dailyRecord" onClick={() => setPage("DailyRecord")}>
                  <button className={`b1 ${page === "DailyRecord" ? "active" : ""}`}
                     onMouseEnter={() => setHover("n") }
                     onMouseLeave={() => setHover(null)}>
                        {hover === "n" || page === "DailyRecord" ? <img src={IconN}/> : <img src={IconNBlack}/>}
                     <h2>Daily<br />Record</h2>
                  </button>
             </Link>
             <Link to="/createDailyRecord" onClick={() => setPage("CreateDailyRecord")}>
               <button className={`b1 ${page === "CreateDailyRecord" ? "active" : ""}`}
                  onMouseEnter={() => setHover("an") }
                  onMouseLeave={() => setHover(null)}>
                     {hover === "an" || page === "CreateDailyRecord" ? <img src={IconAN}/> : <img src={IconANBlack}/>}
                  <h2>Add <br /> New Record</h2>
               </button>
             </Link>
             <Link to="/dashboardCategory" onClick={() => setPage("DashboardCategory")}>
               <button className={`b1 ${page === "DashboardCategory" ? "active" : ""}`}
                  onMouseEnter={() => setHover("c") }
                  onMouseLeave={() => setHover(null)}>
                     {hover === "c" || page === "DashboardCategory" ? <img src={IconC}/> : <img src={IconCBlack}/>}
                  <h2> Categories</h2>
               </button>             
             </Link>
                  {page === "DashboardCategory" && (
                     <div className="sub-menu">
                        <Link to="/dashboardCategory">
                        <div className='d-sub'>
                           {/* <div className='cer'></div> */}
                           <button className={`b2 ${page === "DashboardCategory" ? "active" : ""}`}>
                              <h3>Dashboard</h3>
                           </button>
                        </div>

                        </Link>

                        <Link to="/manageCategory">
                        <div className='d-sub'>
                           {/* <div className='cer'></div> */}
                           <button className={`b2 ${page === "ManageCategory" ? "active" : ""}`}>
                              <h3>Manage Category</h3>
                           </button>
                        </div>

                        </Link>
                     </div>
                  )}
         </div>
        </div>
    )
}
export default HambergerBar