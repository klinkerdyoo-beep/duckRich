import React from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar'
import Fliter from '../components/Fliter'


const Home = () => {
    const data = [
        { id: 1, date: '24/5/2568', item: 'ค่าของกิน', amount: '200 b' },
        { id: 2, date: '25/5/2568', item: 'ค่าเดินทาง', amount: '50 b' },
        { id: 3, date: '25/5/2568', item: 'ค่ากาแฟ', amount: '120 b' },
    ];
    
  return (
    <>
            <HambergerBar/>
    <div className="main-container"> {/* เพิ่ม class หลักเพื่อจัดการพื้นที่ */}
        <div className="header-section">
            <h1>Dashboard </h1>
            <button className='button-a'>Add New</button>
        </div>
            <div className='glass-panel2'>
                
            </div>

        <div className="glass-panel"> 
            <Fliter/>
            <table className="home-table">
                <thead>
                    <tr> 
                        <th>Sl. Number</th> {/* เพิ่มหัวข้อ Sl. Number */}
                        <th>Date</th>
                        <th>Note</th>
                        <th>Total</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={row.id} className='home-table-tr'>
                            <td>
                                <span className='serial-number'>{('0' + (index + 1)).slice(-2)}</span>
                            </td>
                            <td>{row.date}</td>
                            <td>{row.item}</td>
                            <td>{row.amount}</td>
                            <td>
                                <Link to={`edit/${row.id}`}>
                                <button className='edit-button'>Edit</button>
                                </Link>
                            </td> 

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* เพิ่มส่วน Pagination (เลขหน้า) */}
        <div className='pagination-container'>
            <button className='pagination-button active'>1</button>
            <button className='pagination-button'>2</button>
            <span>...</span>
            <button className='pagination-button'>8</button>
            <button className='pagination-arrow'>→</button>
        </div>
    </div>
    </>
  );
};

export default Home;