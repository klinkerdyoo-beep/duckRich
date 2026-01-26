import React, { useState, useEffect } from 'react';

import '../App.css'; 
import './CreateDailyRecord.css'; 
import wallets from "../data/wallets";
import * as LucideIcons from "lucide-react";
import { Save } from 'lucide-react';
import { useNavigate, useParams  } from "react-router-dom";


import HambergerBar from '../components/HambergerBar'
// import icons from "../data/icons";

import { Pencil, X } from 'lucide-react';

const CategoryIcon = ({ icon, size = 20, color = "currentColor" }) => {
  const IconComponent = LucideIcons[icon]; // LucideIcons มาจาก import * as LucideIcons
  if (!IconComponent) return null; // ถ้าไม่มี icon ตัวนี้ก็ไม่ render
  return <IconComponent size={size} color={color} />;
};

const EditRecord = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [page, setPage] = useState("CreateDailyRecord");
    const [type, setType]  = useState("ex")
    const [categories, setCategories] = useState(1); // selected category id
    const [categoryList, setCategoryList] = useState([]); // list from server
    const [walletList, setWalletList] = useState([]);
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState("");
    const [walletId, setWalletId] = useState(null);


        const getCategory = async () =>{
            try {
                const response = await fetch("http://localhost:5000/category");
                const jsonData= await response.json();
    
                setCategoryList(jsonData);
            } catch (error) {
                console.error(error.massage);
            }
        }; 

        const getWallets = async () => {
            try {
                const response = await fetch("http://localhost:5000/wallets");
                const jsonData= await response.json();
    
                setWalletList(jsonData);
            } catch (error) {
                console.error(error.massage);
            }
        }
    
        const getTransaction = async () => {
            const res = await fetch(`http://localhost:5000/transaction/${id}`);
            const data = await res.json();

            const d = new Date(data.date);
            d.setHours(d.getHours() + 7);

            const yyyyMmDd = d.toISOString().split("T")[0];

            setDate(yyyyMmDd);
            setType(data.type === "IN" ? "in" : "ex");
            setCategories(data.category_id);
            setNote(data.note || "");
            setAmount(data.amount);
            setWalletId(data.wallet_id);
        };

        useEffect(() => {
            getCategory();
            getWallets();
            getTransaction();
        }, []);

        const updateRecord = async () => {
        try {
            await fetch(`http://localhost:5000/transaction/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date,
                type: type === "ex" ? "EX" : "IN",
                category_id: categories,
                note,
                amount,
                wallet_id: walletId,
            }),
            });

            navigate("/");
        } catch (err) {
            console.error(err);
        }
        };

    
  return (
    <>
        <HambergerBar page={page} setPage={setPage}/> 
        <div className="content">
            <div className='main-create'>
                <div className='glass-panel3'>
                    <div className='for-panel3'>
                        <h2>Date</h2>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-date" />
                    </div>
                    <div className='for-panel3'>
                        <h2>Expense/Income</h2>

                        <div className="flex items-center gap-4 w-64 p-5">
                            <div className="toggle-container">
                                  <input
                                    type="checkbox"
                                    className="toggle-input"
                                    checked={type === "in"}       // ถ้า type = "in" จะเป็น ON
                                    onChange={() => setType(type === "ex" ? "in" : "ex")}
                                />
                            <div className="toggle-handle-wrapper">
                                <div className="toggle-handle">
                                    <div className="toggle-handle-knob "></div>
                                    <div className="toggle-handle-bar-wrapper">
                                        <div className="toggle-handle-bar"></div>
                                    </div>
                                </div>
                            </div>
                                <div className="toggle-base">
                                    <div className="toggle-base-inside"></div>
                                </div>
                            </div>
                            <p className={`ex ${type === "ex" ?  "active" : ""} }`} onClick={() => {setType("ex")}}>Expense</p>
                            <p className={`in ${type === "in" ?  "active" : ""} }`}  onClick={() => {setType("in")}}>Income</p>

                            
                        </div>

                    </div>
                    <div className='for-panel3'>
                        <h2>Category</h2>
                            <div style={{display: "flex", gap:"20px", flexWrap: "wrap"}}>
                                {categoryList.map((row) => (
                                    <div
                                        key={row.id}
                                        onClick={() => setCategories(row.id)}
                                        style={{backgroundColor: categories === row.id ? row.color : "#ffffff", // สีพื้นหลังเมื่อ active, สีเทาเมื่อไม่ active
                                                color: categories === row.id ? "#fff" : row.color,
                                                
                                                cursor: "pointer",
                                        }}
                                        className={`category-panel ${categories === row.id ? "active" : ""}`}
                                    >
                                        <CategoryIcon icon={row.icon} alt={row.name}/>
                                        {row.name}
                                        
                                    </div>
                                ))}
                            </div>  
                    </div>
                    <div className='for-panel3'>
                                <h2>Wallets</h2>
                    <div className="record-wallet-list">
                    {walletList.map(wallet => (
                        
                        <div key={wallet.id} className="record-wallet-item" onClick={() => setWalletId(wallet.id)}>
                        
                        {/* Preview */}
                        <div className="record-wallet-show small  ">
                            <img
                            src={wallets.primaryColor[wallet.primary_color]}
                            className="layer primary"
                            alt="primary"
                            />
                            <img
                            src={wallets.secondaryColor[wallet.secondary_color]}
                            className="layer secondary"
                            alt="secondary"
                            />
                            <img
                            src={wallets.accentColor[wallet.accent_color]}
                            className="layer accent"
                            alt="accent"
                            />
                            <img
                            src={wallets.logoColor[wallet.logo_color]}
                            className="layer logo"
                            alt="logo"
                            />
                        </div>

                        {/* Info */}
                        <div className={`record-wallet-info ${walletId === wallet.id ? "active" : ""}`}>
                            <h3>{wallet.name}</h3>
                            <p>Type: {wallet.wallet_type}</p>s
                            <p>Balance: {wallet.balance}</p>
                        </div>

                        </div>
                    ))}
                    </div>
                    </div>
                        <div className='for-panel3'>
                            <h2>Note</h2>
                            <textarea className="input-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write your note..."></textarea>
                        </div>

                        <div className='for-panel3'>
                            <h2>Amount</h2>
                            <input type="number" className="input-amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="0.00" />
                        </div>
                    <div className='but'style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                            <button className='button-save' onClick={updateRecord}><Save/></button>                        
                    </div>
                </div>
            </div>
        </div>

    </>
  );
};  

export default EditRecord;  