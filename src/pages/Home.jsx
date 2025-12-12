import React, { useState } from 'react';
import '../App.css'; 
import './Home.css';
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar'
import Fliter from '../components/Fliter'


const Home = () => {
    const data = [
        { id: 1, date: '24/5/2568', item: 'ค่าของกิน', amount: '200 b' },
        { id: 2, date: '25/5/2568', item: 'ค่าเดินทาง', amount: '50 b' },
        { id: 3, date: '25/5/2568', item: 'ค่ากาแฟ', amount: '120 b' },
    ];
    // const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState("Home");

  return (
    <>
    <HambergerBar page={page} setPage={setPage}/>
    <div className={`content`}>
        <div className="header-section">
            <h1>Dashboard </h1>
        </div>
<div className="overview">

    <div className='' style={{display:'flex',flexDirection: "column",gap: '20px'}}>
        <div style={{display:'flex' ,justifyContent: 'space-between'}}>
            <div className="overview-box"
                style={{
                    background: `
                    radial-gradient(#ffb163ff 2px, transparent 2px) 0 0 / 20px 20px,
                    radial-gradient(#ffb163ff 2px, transparent 2px) 10px 10px / 20px 20px,
                    linear-gradient(-90deg, #FE9427, #ffb163ff, #FE9427)
                    `
                ,height: '100px'}}
            >
                <div style={{display:'flex', alignItems:'center',justifyContent: 'space-between',gap: '10px'}}>
                    <p className="overview-title">รายจ่ายวันนี้</p>
                    <p className="overview-sub">3 รายการ</p>
                </div>
                <h2 className="overview-value">320 ฿</h2>
            </div>

            <div className="overview-box"
                style={{
                    background: `
                    radial-gradient(#8ba8ffff 2px, transparent 2px) 0 0 / 20px 20px,
                    radial-gradient(#8ba8ffff 2px, transparent 2px) 10px 10px / 20px 20px,
                    linear-gradient(-90deg, #6c88f9ff, #8ba8ffff, #6c88f9ff)
                    `
                ,height: '100px'
                }}
            >
                <p className="overview-title">รายจ่ายรวมเดือนนี้</p>
                <h2 className="overview-value">5,420 ฿</h2>
                {/* <p style={{background:'white',borderRadius:'20px',textAlign:'center'}} className="overview-change positive">↑ 12% เพิ่มขึ้นจากเดือนก่อน</p> */}
            </div>              
        </div>

            
        <div className='overview-box-2 box-col1-bottom'>
            <p className="overview-title">เทียบกับเดือนก่อน</p>
            <p className="overview-change positive" style={{background:'white',borderRadius:'20px',textAlign:'center',padding:'5px' }}>↑ 12% เพิ่มขึ้นจากเดือนก่อน</p>
        </div>
    </div>


    {/* 3. สรุปรายจ่ายตามสัปดาห์ (Weekly Summary) - โทนเขียว/มิ้นต์ (Green/Mint) ให้ความรู้สึกของการเติบโต/ข้อมูลโดยละเอียด */}
    <div className="overview-box"
        style={{
            background: `
            radial-gradient(#F098C0 2px, transparent 2px) 0 0 / 20px 20px,
            radial-gradient(#F098C0 2px, transparent 2px) 10px 10px / 20px 20px,
            linear-gradient(-90deg, #E6549C, #F098C0, #E6549C)
            `
        }}
    >
        <p className="overview-title">สรุปรายจ่ายตามสัปดาห์</p>
        <p className="overview-sub">Week 1: 1,200 ฿</p>
        <p className="overview-sub">Week 2: 900 ฿</p>
        <p className="overview-sub">Week 3: 1,050 ฿</p>
        <p className="overview-sub">Week 4: 1,100 ฿</p>
    </div>
</div>

        <div className="glass-panel"> 
                <Fliter/>
            <div className='dtable'>
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
                                <button className='button-edit'>Edit</button>
                                </Link>
                            </td> 

                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
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