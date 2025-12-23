import React, { useState } from 'react';
import '../App.css'; 
import './DashboardCategory.css';
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar';
import Fliter from '../components/Fliter';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

const DashboardCategory = () => {
    const [page, setPage] = useState("DashboardCategory");
        const category = [
        { id: 1, name:"food", color:"#19A598"},
        { id: 2, name:"shop", color:"#FE9427"},
    ]
    return (
        <>
        <HambergerBar page={page} setPage={setPage}/> 
        <div className={`content`}>
            <div className='header-section'>
                <h1> Dashboard</h1>
            </div>
            <div className='glass-panel2' style={{display:'flex', flexDirection: "column" }}>
                <p>All Category</p>
                <div>
                        <div style={{display: "flex", gap:"20px"}}>
                            {category.map((row, index) => (
                                <div key={row.id} style={{backgroundColor: row.color}} className={` category-panel`}>
                                    {row.name}
                                </div>
                            ))}
                        </div>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <PieChart/>
                <BarChart/>                
            </div>

            <div className='glass-panel3'>
                <h2>Manage Category</h2>
                <Fliter/>
                <div className='glass-panal4'>
                    
                </div>
            </div>
        </div>
        </>
    )

}

export default DashboardCategory;