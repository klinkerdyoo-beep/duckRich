import React, { useState } from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar'

const AddNewCategory = () => {
const colors = [
    // Column 1 (โทนเขียว-น้ำเงิน)
    { id: 1, color: "#1773E0" }, // น้ำเงิน
    { id: 2, color: "#19A598" }, // เขียวเข้ม
    { id: 3, color: "#78CFC7" }, // เขียวอ่อน

    // Column 2 (โทนส้ม)
    { id: 4, color: "#FE9427" },
    { id: 5, color: "#FEB557" },
    { id: 6, color: "#F87D5B" },
    { id: 7, color: "#FDAB96" },

    // Column 3 (โทนชมพู-ม่วง)
    { id: 8, color: "#CF455E" },
    { id: 9, color: "#E08D97" },
    { id: 10, color: "#5C4B9B" },
    { id: 11, color: "#A69DC8" }
];
    const [page, setPage] = useState("ManageCategory");
    const [categories, setCategories] = useState(1);
    return (
        <>
        <HambergerBar page={page} setPage={setPage}/> 
        <div className={`content`}>
                    <div className='header-section'>
                        <h1> Add New Category</h1>
                    </div>
                    <div className='main-create'>
                        <div className='glass-panel3'>  
                            <div className='for-panel3'>
                                <h2>Color</h2>
                                <div style={{display: "flex", gap:"20px"}}>
                                    {colors.map((row, index) => (
                                        <div key={row.id} onClick={() => {setCategories(row.id)}}  style={{backgroundColor: row.color}} className={` color-panel ${categories === row.id ? "active" : ""}`}>
                                        </div>
                                    ))}
                                </div>
                            </div>
                                <div className='for-panel3'>
                                    <h2>Name</h2>
                                    <input type="text" className="input-amount" placeholder="Write your name..." />
                                </div>
                                <div className='for-panel3'>
                                    <h2>Description</h2>
                                    <textarea className="input-note" placeholder="Write your note..."></textarea>
                                </div>
        
                            <div className='but'style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                <Link to={""}>
                                    <button className='button-save'>Save</button>
                                </Link>
                                <Link to={""}>
                                    <button className='button-delete'>Cancle</button>
                                </Link>                                    
                            </div>

                        </div>
                    </div>
                </div>
        </>
    )
}

export default AddNewCategory;