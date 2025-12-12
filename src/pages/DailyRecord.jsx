import React, { useState } from 'react';

import '../App.css'; 
import './DailyRecord.css';
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar'
import Fliter from '../components/Fliter'


const DailyRecord = () => {
    const data = [
        { id: 1, date: '25/5/2568',inEx: "Expense", category: 'Food', item: 'ค่าเดินทาง', amount: '50 b' },
        { id: 2, date: '25/5/2568',inEx: "Expense", category: 'Food', item: 'ค่าเดินทาง', amount: '50 b' },
        { id: 2, date: '25/5/2568',inEx: "Income", category: 'Food', item: 'ค่าเดินทาง', amount: '50 b' },
    ];
    const [page, setPage] = useState("DailyRecord");
    
  return (
    <>
        <HambergerBar page={page} setPage={setPage}/>
        <div className={`content`}>
            <div className='header-section'>
                <h1>Daily Record</h1>
            </div>
            <div>
                <div className='glass-panel3'>
                    <Fliter/>
                    <div className='dtable'>
                        <table className="home-table">
                            <tr>
                                <th>Sl. Number</th> {/* เพิ่มหัวข้อ Sl. Number */}
                                <th>Date</th>
                                <th>In/Ex</th>
                                <th>Category</th>
                                <th>Note</th>
                                <th>Amount</th>
                                <th>Edit</th>
                            </tr>
                            {data.map((row, index) => (
                            <tr key={row.id} className='home-table-tr'>
                                <td>
                                    <span className='serial-number'>{('0' + (index + 1)).slice(-2)}</span>
                                </td>
                                <td>{row.date}</td>
                                <td style={{fontWeight: "bold", color: row.inEx === "Expense" ? "red" : "green"}} >{row.inEx}</td>
                                <td>{row.category}</td>
                                <td>{row.item}</td>
                                <td>{row.amount}</td>
                            <td>
                                <div className='but'>
                                    <Link to={`edit/${row.id}`}>
                                    <button className='button-edit'>Edit</button>
                                    </Link>
                                    <Link to={`edit/${row.id}`}>
                                    <button className='button-delete'>Delete</button>
                                    </Link>                                    
                                </div>

                            </td> 

                            </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </>
  );
};


export default DailyRecord;   