import React, { useState } from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar'
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";


const CreateDailyRecord = () => {
    const data = [
        { id: 1, date: '24/5/2568', item: 'ค่าของกิน', amount: '200 b' },
        { id: 2, date: '25/5/2568', item: 'ค่าเดินทาง', amount: '50 b' },
        { id: 3, date: '25/5/2568', item: 'ค่ากาแฟ', amount: '120 b' },
    ];
    const category = [
        { id: 1, name:"food", color:"#19A598"},
        { id: 2, name:"shop", color:"#FE9427"},
    ]
    const [page, setPage] = useState("CreateDailyRecord");
    const [type, setType]  = useState("ex")
    const [categories, setCategories] = useState(1);
  return (
    <>
        <HambergerBar page={page} setPage={setPage}/> 
        <div className={`content`}>
            <div className='header-section'>
                <h1> Create Daily Record</h1>
            </div>
            <div className='main-create'>
                <div className='glass-panel3'>
                    <div className='for-panel3'>
                        <h2>Date</h2>
                        <input type="date" className="input-date" />
                    </div>
                    <div className='for-panel3'>
                        <h2>In/Ex</h2>
                            <div style={{display:"flex", gap:"0px"}}>
                                <p className={`ex ${type === "ex" ?  "active" : ""} }`} onClick={() => {setType("ex")}}>Expense</p>
                                <p className={`in ${type === "in" ?  "active" : ""} }`}  onClick={() => {setType("in")}}>Income</p>
                            </div>
                    </div>
                    <div className='for-panel3'>
                        <h2>Category</h2>
                        <div style={{display: "flex", gap:"20px"}}>
                            {category.map((row, index) => (
                                <div key={row.id} onClick={() => {setCategories(row.id)}}  style={{backgroundColor: row.color}} className={` category-panel ${categories === row.id ? "active" : ""}`}>
                                    {row.name}
                                </div>
                            ))}
                        </div>
                    </div>
                        <div className='for-panel3'>
                            <h2>Note</h2>
                            <textarea className="input-note" placeholder="Write your note..."></textarea>
                        </div>

                        <div className='for-panel3'>
                            <h2>Amount</h2>
                            <input type="number" className="input-amount" placeholder="0.00" />
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
  );
};  

export default CreateDailyRecord;