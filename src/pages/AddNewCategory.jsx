import React, { useState } from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar'
import colors from '../data/color';
import icons from "../data/icons";
import './AddNewCategory.css';
import lucideIcons from "../data/lucideIcons"; 
import foodLucideIcons from "../data/lucidelcons/food";
import homeLucideIcons from  "../data/lucidelcons/home";
import {ChefHat} from "lucide-react";
import iconGroupd from '../data/lucidelcons';

// const IconPicker  = ({selectedIcon, onSelect, color}) => {
//     const iconList = Object.keys(icons);
//     return(
//         <div className="icon-grid">
//             {iconList.map((path) => {
//                     const iconName = path.split("/").pop().replace(".svg", "");
//                     const IconSrc = icons[path].default;

//                     return (
//                         <img key={iconName} src={IconSrc} alt={iconName} className='icon-item'/>
//                     )
//                     })}
//         </div>
//         );
//     }

const AddNewCategory = () => {
    console.log(iconGroupd)

    const [page, setPage] = useState("ManageCategory");
    // const [categories, setCategories] = useState(1);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectColor, setSelectColor] = useState(colors[0].color);
    const [selectIconCategory,setSelectIconCategory] = useState(Object.keys(iconGroupd)[0]);
    const [selectIcon, setSelectIcon] = useState("");

    const postCategory = async () =>{
        if (!name.trim()) return alert("Name required");

        try {
            const response = await fetch("http://localhost:5000/category",{
                method: "POST"  ,
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    color: selectColor,
                    icon: selectIcon
                })
            });
            if (!response.ok) throw new Error("Failed");
            
        } catch (error) {
            console.error(error.message);
        }
    };

    return (    
        <>
        <HambergerBar page={page} setPage={setPage}/> 
        <div className={`content`}>
                    <div className='main-create'>
                        <div className='glass-panel3'>  
                            <div className='for-panel3'>
                                <h2>Color</h2>
                                <div style={{display: "flex", gap:"20px"}}>
                                    {colors.map((row, index) => (
                                        <div key={row.id} onClick={() => setSelectColor(row.color)}  style={{backgroundColor: row.color}} className={` color-panel ${selectColor === row.color ? "active" : ""}`}>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='for-panel3'>
                                <h2>Icon</h2>
                                {/* <IconPicker/> */}
                                <div className="card">
                                    <section className="days-section">
                                        {Object.entries(iconGroupd).map(([groupName, group]) => {
                                            const MainIcon = group.mainIcon;

                                            return(
                                                <button key={groupName} onClick={() => {setSelectIconCategory(groupName)}  }
                                                className={`day ${ selectIconCategory === groupName ? "active" : ""}`}>
                                                    <MainIcon size={20} strokeWidth={2}/>
                                                </button>
                                            )
                                        })}
                                    </section>

                                    <section className="info-section">

                                        <div className="left-side">
                                            {Object.entries(iconGroupd[selectIconCategory].icons).map(([name, Icon]) => (
                                                <button key={name} onClick={() => setSelectIcon(name)} className={` selectIcon ${selectIcon === name ? "active" : "" }` }>
                                                   <Icon size={24} strokeWidth={2} /> 
                                                </button>
                                                
                                            ))}

                                        </div>
                                    </section>
                                </div>
                            </div>


    
                                <div className='for-panel3'>
                                    <h2>Name</h2>
                                    <input type="text" className="input-amount" placeholder="Write your name..." value={name}  onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className='for-panel3'>
                                    <h2>Description</h2>
                                    <textarea className="input-note" placeholder="Write your note..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
        
                            <div className='but'style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                    <button className='button-save' onClick={postCategory}>Save</button>
                                <Link to={""}>
                                    <button className='button-delete'>Cancle</button>
                                </Link>                                    
                            </div>

                        </div> 
                    </div>
            </div>
        </>
    )
}

export default AddNewCategory;