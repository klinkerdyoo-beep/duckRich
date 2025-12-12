import React, { useState } from 'react';

import '../App.css'; 
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar'
import Fliter from '../components/Fliter'


const EditRecord = () => {
    const data = [
        { id: 1, date: '24/5/2568', item: 'ค่าของกิน', amount: '200 b' },
        { id: 2, date: '25/5/2568', item: 'ค่าเดินทาง', amount: '50 b' },
        { id: 3, date: '25/5/2568', item: 'ค่ากาแฟ', amount: '120 b' },
    ];
    
  return (
    <>
        <HambergerBar/>
        <div className={`content`}>
            <div className='header-section'>
                <h1>EditRecord</h1>
            </div>
            <div>
                <div className='glass-panel3'>
                    <div>
                        <h2>Date</h2>
                    </div>
                    <div>
                        <h2>In/Ex</h2>
                    </div>
                    <div>
                        <h2>Category</h2>
                    </div>
                    <div>
                        <h2>Note</h2>
                        <textarea name="" id="10"></textarea>
                    </div>
                    <div>
                        <h2>Amount</h2>
                    </div>
                </div>
            </div>
        </div>

    </>
  );
};

export default EditRecord;   