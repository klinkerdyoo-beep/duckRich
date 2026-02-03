import React, { useState, useEffect, cache } from 'react';
import * as LucideIcons from "lucide-react";
import '../App.css'; 
import './ManageCategory.css';
// import './ManageCategory.css';
import { data, Link } from 'react-router-dom';
import colors from '../data/color';
import HambergerBar from '../components/HambergerBar';
import Fliter from '../components/Fliter';
import IconANC from '../assets/IconAddNewCategory.png';
import iconGroupd from "../data/lucidelcons/index";
import { Pencil, Trash2 } from 'lucide-react';


// const CategoryIcon = ({ icon, alt }) => {
//   const Icon = icons[`../assets/icons/${icon}.svg`]?.default;
//   if (!Icon) return null;

//   return <img src={Icon} alt={alt} style={{ width: 30,  marginRight: 8 }}/>;
// };
console.log(iconGroupd);

const CategoryIcon = ({ icon, size = 20, color = "currentColor" }) => {
  const IconComponent = LucideIcons[icon];

  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} />;
};

const findIconGroup = (iconName) => {
  for (const [groupName, group] of Object.entries(iconGroupd)) {
    if (group.icons && group.icons[iconName]) {
        console.log("FOUND in:", groupName);
      return groupName;
    }
  }
  console.log("NOT FOUND:", iconName);
  return null;
};
const ManageCategory = () => {
    const [page, setPage] = useState("ManageCategory");
    const [category, setCategory] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [selectColor, setSelectColor] = useState('');
    const [selectIconCategory,setSelectIconCategory] = useState("");
    const [selectIcon, setSelectIcon] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    const getCategory = async () =>{
        try {
            const response = await fetch("http://localhost:5000/category");
            const jsonData= await response.json();

            setCategory(jsonData);
        } catch (error) {
            console.error(error.massage);
        }
    }; 

  const updateCategory = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/category/${id}`, {
      method: "PUT", // หรือ PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        color: selectColor,
        icon: selectIcon,
      }),
    });

    if (!response.ok) throw new Error("Update failed");

    // รีเฟรช list
    getCategory();
    setShowEdit(false);

  } catch (error) {
    console.error(error.message);
  }
};

    const deleteCategory = async (id) =>{
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try{
            const response = await fetch(`http://localhost:5000/category/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                // Refresh category list
                setCategory(prev => prev.filter(cat => cat.id !== id));
            } else {
                console.error("Failed to delete category");
            }

        }catch (error) {
            console.error(error.massage);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    console.log(category);
    return (
        <>
        <HambergerBar page={page} setPage={setPage}/> 
        <div className={`content`}>

            <Link to="/addNewCategory" className="toggle-container">
            <button className="toggle neo-btn">
                <span className="button">
                <span className="label">+</span>
                </span>
                <h2>Add New Category</h2>
            </button>
            </Link>

            <div className='glass-panel3'>
                <Fliter/>
                <div className='dtable'>
                    <table className='category-table'>
                        <tr>
                            <th></th> 
                            <th>Date</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Edit</th>
                        </tr>
                        {category.map((row, index) => (
                            <React.Fragment key={row.id}>
                            
                            <tr key={row.id} className='category-table-tr'>
                                <td>
                                    <span className='serial-number'>{('0' + (index + 1)).slice(-2)}</span>
                                </td>
                                <td>{new Date(row.updated_at).toLocaleDateString("en-GB")}</td>
                                <td>  
                                    <div key={row.id} style={{backgroundColor: row.color}} className={`category-panel`}>
                                     <CategoryIcon icon={row.icon} alt={row.name}/>
                                    {row.name}
                                    </div>
                                </td>
                                <td>{row.description}</td>
                                <td>
                                    <div className='but'>
                                        <button onClick={() => {setShowEdit(prev => (prev === row.id ? null : row.id));setSelectColor(row.color);setSelectIcon(row.icon);const group = findIconGroup(row.icon);setSelectIconCategory(group);}}> 
                                            <Pencil className="pencil-icon"/>
                                        </button>
                                        <button onClick={() => deleteCategory(row.id)} className="trash-button"
                                        >                              
                                            <Trash2 className="trash-icon" /> 
                                        </button>                                    
                                    </div>  
                                </td>

                            </tr>
                                {showEdit === row.id &&(
                                    <tr className="edit-row">
                                        <td colSpan="5">
                                            <div className="hidden-box">

                                                    <div className='edit-input'>
                                                        <div className='for-panel3'>
                                                            <h2>Name</h2>
                                                            <input className='border-2 rounded-md' name='nameCategory' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder={row.name} />
                                                        </div>
                                                        <div className='for-panel3'>
                                                            <h2>Description</h2>
                                                            <textarea className='border-2 rounded-md' name='nameCategory' value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder={row.description}></textarea>
                                                        </div>                                                   
                                                    </div>   

                                                    <div>
                                                        <h2>Color</h2>
                                                        <div className='edit-color'>
                                                            {colors.map((row, index) => (
                                                                <div key={row.id} onClick={() => setSelectColor(row.color)}  style={{backgroundColor: row.color}} className={` color-panel ${selectColor === row.color ? "active" : ""}`}>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>                                                                                                     

                                                <div>
                                                    <h2>Icons</h2>
                                                    <div className="card">
                                                    {/* กลุ่ม icon */}
                                                    <section className="days-section">
                                                        {Object.entries(iconGroupd).map(([groupName, group]) => {
                                                        const MainIcon = group.mainIcon;

                                                        if (!MainIcon) return null;

                                                        return (
                                                            <button
                                                            key={groupName}
                                                            onClick={() => setSelectIconCategory(groupName)}
                                                            className={`day ${
                                                                selectIconCategory === groupName ? "active" : ""
                                                            }`}
                                                            >
                                                            <MainIcon size={20} strokeWidth={2} />
                                                            </button>
                                                        );
                                                        })}
                                                    </section>

                                                    {selectIconCategory &&
                                                    iconGroupd[selectIconCategory]?.icons && (
                                                        <section className="info-section">
                                                        <div className="left-side">
                                                            {Object.entries(iconGroupd[selectIconCategory].icons).map(
                                                            ([name, Icon]) => (
                                                                <button
                                                                key={name}
                                                                onClick={() => setSelectIcon(name)}
                                                                className={`selectIcon ${
                                                                    selectIcon === name ? "active" : ""
                                                                }`}
                                                                >
                                                                <Icon size={24} strokeWidth={2} />
                                                                </button>
                                                            )
                                                            )}
                                                        </div>
                                                        </section>
                                                    )}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="save-btn" onClick={() => updateCategory(row.id)} >
                                                Save
                                            </button>    
                                        </td>
                                    </tr>
                                )}
                                </React.Fragment>
                        ))}

                    </table>
                </div>
            </div>
        </div>
        </>
    )

}

export default ManageCategory;