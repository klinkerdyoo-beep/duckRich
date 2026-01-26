import React, { useState, useEffect } from "react";

import '../App.css';
import './Wallets.css';
import wallets from "../data/wallets";
import HambergerBar from '../components/HambergerBar';
import { Link } from "react-router-dom";

const Wallets = () => {
    const [page,setPage] = useState("Wallets")
    const [walletList, setWalletList] = useState([]);

    useEffect(() => {
        
        fetch("http://localhost:5000/wallets")
            .then(res => res.json())
            .then(data => setWalletList(data))
            .catch(err => console.error(err));
        }, []);
console.log("walletList length:", walletList.length);
console.log("walletList:", walletList);
    return(
        <>
        <HambergerBar page={page} setPage={setPage} />
        <div className='content'>

            <Link to="/addNewWallet" className="toggle-container">
            <button className="toggle neo-btn">
                <span className="button">
                <span className="label">+</span>
                </span>
                <h2>Add New Wallet</h2>
            </button>
            </Link>
            <div className="glass-panel3">
<div className="wallet-list">
  {walletList.map(wallet => (
    
    <div key={wallet.id} className="wallet-item">
        
        {wallet.name}

      {/* Preview */}
      <div className="wallet-show small">
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
      <div className="wallet-info">
        <h3>{wallet.name}</h3>
        <p>Type: {wallet.wallet_type}</p>
        <p>Balance: {wallet.balance}</p>
      </div>

    </div>
  ))}
</div>


            </div>

        </div>
        </>
    )
}

export default Wallets