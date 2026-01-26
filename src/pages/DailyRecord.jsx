import React, { useState } from 'react';
import '../App.css'; 
import './DailyRecord.css';
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar'
import Fliter from '../components/Fliter'
import { Pencil, Trash2 } from 'lucide-react';



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
                                    <Link to={`edit/${row.id}`} className="" >
                                    <Pencil className="pencil-icon"/>
                                    </Link>
                                    <Link to={`edit/${row.id}`} className="">
                                        {/* <Trash2 className="text-red-500 w-5 h-5 inline-blocktransform hover:scale-125 transition-transform duration-200" />  */}
                                        <Trash2 className="trash-icon" /> 
                                    </Link>                                    
                                </div>  
                            </td>

                            </tr>
                            ))}
                        </table>
                    </div>
                    <div className='inline-flex'>
                        <div className='box1'></div>
                        <div className='box2'></div>

                        
                    </div>
                </div>
            </div>
        </div>

    </>
  );
};


export default DailyRecord;   