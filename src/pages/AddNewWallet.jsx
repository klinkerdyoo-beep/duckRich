import React, { useState } from 'react';
import '../App.css';
import './AddNewWallet.css';
import wallets from "../data/wallets";
import HambergerBar from '../components/HambergerBar';
import { Save } from 'lucide-react';

const AddNewWallet = () => {
  const [page, setPage] = useState("addNewWallets");
  const [sections, setSections] = useState("primaryColor");
  const [name, setName] = useState("");
const [theme, setTheme] = useState({
  primaryColor: "red",
  secondaryColor: "red",
  logoColor: "red",
  accentColor: "red",
});

// const postWallet = async () => {
//   if(!name.trim()) return alert("Name required");
//   try{
//     const response = await fetch ("http://localhost:5000/wallets", {
//       method: "POST" ,
//       headers: {
//         "Content-Type" : "application/json"
//       },
//       body: JSON.stringify({
//         name: name,
//         theme: theme
//       }),
//     });
//   }catch (error){
//     console.error(error.massage);
//   }
// };

const createTheme = async () => {
  const res = await fetch("http://localhost:5000/themes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      theme: theme
    })
  });

  return await res.json(); // <-- จะได้ theme.id
};

const postWallet = async () => {
  if (!name.trim()) return alert("Name required");

  try {
    // 1. สร้าง theme
    const themeData = await createTheme();

    // 2. สร้าง wallet
    await fetch("http://localhost:5000/wallets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        wallet_type: "cash",
        balance: 0,
        theme_id: themeData.id,
      })
    });

    alert("Wallet saved 🎉");

  } catch (error) {
      console.error("POST /wallets error:", error.message);
      console.error(error);
      res.status(500).json(error.message);
  }
};


  return (
    <>
      <HambergerBar page={page} setPage={setPage} />

      <div className="content" >
        <div className='flex gap-1 mb-5'>
            <label htmlFor="name">Wallet Name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}  placeholder='...' />          
        </div>


        <div className="glass-panel3">

          {/* Wallet Preview */}
<div className="wallet-preview">
  <div className='wallet-show'>
    <img src={wallets.primaryColor[theme.primaryColor]} alt="Primary" className="layer primary" />
    <img src={wallets.secondaryColor[theme.secondaryColor]} alt="Secondary" className="layer secondary" />
    <img src={wallets.accentColor[theme.accentColor]} alt="Accent" className="layer accent" />
    <img src={wallets.logoColor[theme.logoColor]} alt="Logo" className="layer logo" />    
  </div>

  </div>


          <div className='wallet-card'>
            <section className='tap-section'>
              <button onClick={() => setSections("primaryColor")}  className={`tap ${ sections === "primaryColor" ? "active" : ""}`}>
                  <svg width="72" height="13" viewBox="0 0 72 13" fill="none" xmlns="http://www.w3.org/2000/svg"
                 style={{ color: "#FF0000" }}>
                  <g filter="url(#filter0_d_163_2189)" >
                  <path d="M70.8669 9.54492C70.8669 10.3 70.2548 10.9121 69.4998 10.9121H2.23413C1.47905 10.9121 0.866943 10.3 0.866943 9.54492V0C0.866943 0.755077 1.47905 1.36719 2.23413 1.36719H30.3406V9.53613C30.3408 10.291 30.9528 10.9033 31.7078 10.9033H40.0261C40.781 10.9033 41.3931 10.291 41.3933 9.53613V1.36719H69.4998C70.2548 1.36719 70.8669 0.755077 70.8669 0V9.54492Z" 
                  fill="currentColor"/>
                  </g>
                  <defs>
                  <filter id="filter0_d_163_2189" x="7.02739e-05" y="0" width="71.7337" height="12.6459" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="0.866873"/>
                  <feGaussianBlur stdDeviation="0.433437"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_163_2189"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_163_2189" result="shape"/>
                  </filter>
                  </defs>
                  </svg>
              </button>
              <button onClick={() => setSections("secondaryColor")}   className={`tap ${ sections === "secondaryColor" ? "active" : ""}`}>
                <svg width="70" height="42" viewBox="0 0 70 42" fill="none" xmlns="http://www.w3.org/2000/svg"
                 style={{ color: "#FF0000" }}>
                <path d="M67.833 0C69.0298 0.000104164 69.9999 0.970242 70 2.16699V32.291H40.5264V41.8271H29.4736V32.291H0V2.16699C0.000102309 0.970241 0.970241 0.000102966 2.16699 0H67.833Z" 
                fill="currentColor"/>
                </svg>

              </button>
              <button onClick={() => setSections("accentColor")}  className={`tap ${ sections === "accentColor" ? "active" : ""}`}>
                  <svg width="65" height="38" viewBox="0 0 65 38" fill="none" xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "#FF0000" }}
                  >
                  <path d="M30 38H28V35H30V38ZM38 38H36V35H38V38ZM30 33H28V30H30V33ZM38 33H36V30H38V33ZM2 26.5H4V28.5H0V24H2V26.5ZM9 28.5H5.5V26.5H9V28.5ZM14.5 28.5H11V26.5H14.5V28.5ZM19.5 28.5H16V26.5H19.5V28.5ZM24.5 28.5H21V26.5H24.5V28.5ZM29.5 28.5H26V26.5H29.5V28.5ZM34.5 28.5H31V26.5H34.5V28.5ZM39.5 28.5H36V26.5H39.5V28.5ZM44.5 28.5H41V26.5H44.5V28.5ZM49.5 28.5H46V26.5H49.5V28.5ZM54.5 28.5H51V26.5H54.5V28.5ZM59.5 28.5H56V26.5H59.5V28.5ZM65 28.5H61V26.5H63V24H65V28.5ZM30 25H28V22H30V25ZM38 25H36V22H38V25ZM2 22H0V16H2V22ZM65 22H63V16H65V22ZM32 19H30V20H28V17H32V19ZM38 17V20H36V19H34V17H38ZM2 14H0V8H2V14ZM65 14H63V8H65V14ZM2 6H0V0H2V6ZM65 6H63V0H65V6Z"
                    fill="currentColor" // เปลี่ยนสีตาม color picker
                  />
                </svg>
              </button>
              <button onClick={() => setSections("logoColor")}  className={`tap ${ sections === "logoColor" ? "active" : ""}`}> 
                <svg  width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#FF0000" }} // สีแดง
                >
                    <path d="M42.2334 0C45.1717 2.7735e-05 47.5534 2.38209 47.5537 5.32031V42.6895C47.5537 45.6279 45.1718 48.0097 42.2334 48.0098H40.7959C38.3319 48.0097 36.2593 46.335 35.6543 44.0615C32.6069 46.5299 28.7262 48.0098 24.499 48.0098C17.2689 48.0098 11.0496 43.6841 8.28711 37.4795C3.30818 36.289 0.000235641 34.1881 0 31.792C0 29.5766 2.82706 27.6115 7.18848 26.3867C8.96012 18.4593 16.0375 12.5342 24.499 12.5342C28.6433 12.5342 32.456 13.9552 35.4756 16.3369V5.32031C35.4758 2.38211 37.8576 6.05222e-05 40.7959 0H42.2334Z" fill="currentColor"/>
                </svg>
              </button>

            </section>

            <section className='picker-section'>
            <div className="wallet-picker">
              {Object.entries(wallets[sections]).map(([name, src]) => (
                <button
                  key={name}
                  onClick={() => setTheme(prev => ({ ...prev, [sections]: name }))}
                  className={theme[sections] === name ? "active" : ""}
                >
                  <img src={src} alt={name} className='wallet-picker-img'  />
                </button>
              ))}
            </div>

            </section>
          </div>
        </div>
        <div className='flex w-[70%] mt-2'>
            <button className='ml-auto cursor-pointer 'onClick={postWallet}><Save/></button>
        </div>
      </div>
    </>
  );
};

export default AddNewWallet;
