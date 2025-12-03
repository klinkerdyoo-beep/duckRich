import './edit.css'; 
import React from 'react';

const Edit = () => {
    const data = [
        { id: 1, date: '24/5/2568', item: 'ค่าของกิน', amount: '200 b' },
        { id: 2, date: '25/5/2568', item: 'ค่าเดินทาง', amount: '50 b' },
        { id: 3, date: '25/5/2568', item: 'ค่ากาแฟ', amount: '120 b' },
    ];
    
  return (
    <div className="main-container"> {/* เพิ่ม class หลักเพื่อจัดการพื้นที่ */}
        <div className=''>
            

        </div>
        <div className="header-section">
            <h1>Edit </h1>
            <button className='button-a'>Add New</button>
        </div>

        <div className="glass-panel"> 
            <table className="home-table">
                <thead>
                    <tr> 
                        <th>Sl. Number</th> {/* เพิ่มหัวข้อ Sl. Number */}
                        <th>Spend/Incom</th>
                        <th>Category</th>
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
                            <td>Incom</td>
                            <td>category</td>
                            <td>{row.date}</td>
                            <td>{row.item}</td>
                            <td>{row.amount}</td>
                            <td>{row.amount}</td>
                            <td>
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
  );
};

export default Edit;