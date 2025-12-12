import React, { useState } from 'react';
import '../App.css'; 
import './ManageCategory.css';
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar';
import Fliter from '../components/Fliter';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

const ManageCategory = () => {
    const [page, setPage] = useState("ManageCategory");
    return (
        <>
        <HambergerBar page={page} setPage={setPage}/> 
        <div className={`content`}>
            <div className='header-section'>
                <h1> Manage Category</h1>
            </div>
            <div className='glass-panel2'></div>
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

export default ManageCategory;