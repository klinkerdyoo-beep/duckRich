import React, { useState, useEffect } from 'react';
import '../App.css'; 
import './Home.css';
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar'
import Fliter from '../components/Fliter'
import { Pencil, Trash2 } from 'lucide-react';
import wallets from "../data/wallets";
import * as LucideIcons from "lucide-react";
import iconGroupd from "../data/lucidelcons/index";
import DayTable from "../components/dayTable";


const Home = () => {
    const [transaction, setTransaction] = useState([]);
    const [walletList, setWalletList] = useState([]);
    const [categoryList, setcategorytList] = useState([]);

    // const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState("Home");
    const [filter, setFilter] = useState(1);

    const getTransaction = async () => {
        try{
            const response = await fetch("http://localhost:5000/transaction")
            const jsonData = await response.json();

            setTransaction(jsonData);
            console.log("set transaxtion successfully");
        }catch (err){
            console.error(err.message);
        }
    };

    const getWallets = async () => {
        try {
            const response = await fetch("http://localhost:5000/wallets");
            const jsonData = await response.json();
            setWalletList(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getCategory = async () => {
        try {
            const response = await fetch("http://localhost:5000/category");
            const jsonData = await response.json();
            setcategorytList(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        getTransaction();
        getWallets();
        getCategory();
    }, []);

    const walletMap = Object.fromEntries(
        walletList.map(w => [w.id, w])
    );

    const categoryMap = Object.fromEntries(
        categoryList.map(c => [c.id, c])
    );
    
        // ได้ string YYYY-MM-DD (local time)
    const toLocalDateString = (date) =>
    new Date(date).toLocaleDateString("en-CA");

    // วันเริ่มสัปดาห์ (จันทร์)
    const getWeekStart = (date) => {
        const d = new Date(date);
        const day = d.getDay(); // 0=อา
        const diff = d.getDate() - (day === 0 ? 6 : day - 1);
    return new Date(d.setDate(diff));
    };

    const isSameWeek = (dateStr, baseDate = new Date()) => {
        return (
            getWeekStart(dateStr).toDateString() ===
            getWeekStart(baseDate).toDateString()
        );
    };

    const now = new Date();
    const today = toLocalDateString(now);
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const expense = transaction.filter(t => t.type === "EX");
    

    const todayTransactions  = transaction.filter(
        t => toLocalDateString(t.date) === today
    );
    const weekTransactions = transaction.filter(
        t => isSameWeek(t.date)
    );
    console.log("DayTable rows", transaction);
    const todayExpense = expense.filter(
        t => toLocalDateString(t.date) === today
    );
    transaction.forEach(t => {
    console.log(
        t.type,
        toLocalDateString(t.date),
        today
    );
    })
    console.log("todayTransactions", todayTransactions);

    const weekExpense = expense.filter(
    t => isSameWeek(t.date, now)
    )

    const monthExpense = expense.filter(t => {
        const d = new Date(t.date);
        return (
            d.getMonth() === currentMonth &&
            d.getFullYear() === currentYear
        );
    });

    const sumAmount = list =>
        list.reduce((sum, t) => sum + Number(t.amount), 0);

    const expenseTodayCount = todayExpense.length;
    const expenseTodayTotal = sumAmount(todayExpense);

    const expenseWeekCount = weekExpense.length;
    const expenseWeekTotal = sumAmount(weekExpense);

    const expenseMonthCount = monthExpense.length;
    const expenseMonthTotal = sumAmount(monthExpense);


  return (
    <>
    <HambergerBar page={page} setPage={setPage}/>
    <div className="content mt-5 mb-5">

<div  className="overview ">
    

    <div className='' style={{display:'flex',flexDirection: "column",gap: '20px'}}>
        <div style={{display:'flex' ,justifyContent: 'space-between', gap: '20px'}}>
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
                    <p className="overview-sub">{expenseTodayCount} รายการ</p>
                </div>
                <h2 className="overview-value">{expenseTodayTotal} ฿</h2>
            </div>

                <div className="overview-box"
                    style={{
                        background: `
                        radial-gradient(#F098C0 2px, transparent 2px) 0 0 / 20px 20px,
                        radial-gradient(#F098C0 2px, transparent 2px) 10px 10px / 20px 20px,
                        linear-gradient(-90deg, #E6549C, #F098C0, #E6549C) `
                    }} >
                    <div style={{display:'flex', alignItems:'center',justifyContent: 'space-between',gap: '10px'}}>
                        <p className="overview-title">รายจ่ายสัปดาห์นี้</p>
                        <p className="overview-sub">{expenseWeekCount} รายการ</p>
                    </div>
                    <h2 className="overview-value">{expenseWeekTotal} ฿</h2>
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
                <div style={{display:'flex', alignItems:'center',justifyContent: 'space-between',gap: '10px'}}>
                    <p className="overview-title">รายจ่ายเดือนนี้</p>
                    <p className="overview-sub">{expenseMonthCount} รายการ</p>
                </div>
                <h2 className="overview-value">{expenseMonthTotal} ฿</h2>
                {/* <p style={{background:'white',borderRadius:'20px',textAlign:'center'}} className="overview-change positive">↑ 12% เพิ่มขึ้นจากเดือนก่อน</p> */}
            </div>  
           
        </div>

            
        <div className='overview-box-2 box-col1-bottom'>
            <p className="overview-title">เทียบกับเดือนก่อน</p>
            <p className="overview-change positive" style={{background:'white',borderRadius:'20px',textAlign:'center',padding:'5px' }}>↑ 12% เพิ่มขึ้นจากเดือนก่อน</p>
        </div>
    </div>

</div>

            <div className="glass-panel"> 
                    <Fliter filter={filter} setFilter={setFilter} />
                {filter === 1 && (
                    todayTransactions && todayTransactions.length > 0 ?
                <DayTable
                    transaction={todayTransactions}
                    walletMap={walletMap}
                    categoryMap={categoryMap}
                />
                :
                <div className='flex justify-center items-center h-40 text-gray-400'><h1>Don't have transaction for today</h1></div>
                )}

                {filter === 2 && (
                <DayTable
                    transaction={weekTransactions}
                    walletMap={walletMap}
                    categoryMap={categoryMap}
                />
                )}
                {filter === 3 && (
                <DayTable
                    transaction={weekExpense}
                    walletMap={walletMap}
                    categoryMap={categoryMap}
                />
                )}
            </div> 

        

    </div>
    </>
  );
};

export default Home;