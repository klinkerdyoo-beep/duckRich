import React, { useState } from 'react';
import '../App.css'; 
import './ManageCategory.css';
// import './ManageCategory.css';
import { data, Link } from 'react-router-dom';
import HambergerBar from '../components/HambergerBar';
import Fliter from '../components/Fliter';
import IconANC from '../assets/IconAddNewCategory.png';


const ManageCategory = () => {
    const [page, setPage] = useState("ManageCategory");
        const category = [
        { id: 1,date:'01/01/2365' ,name:"food",description:'yuumm', color:"#19A598"},
        { id: 2,date:'01/01/2365' , name:"shop",description:'yuumm', color:"#FE9427"},
    ]
    return (
        <>
        <HambergerBar page={page} setPage={setPage}/> 
        <div className={`content`}>
            <div className='header-section'>
                <h1> Manage Category</h1>
            </div>
            <Link to={`/addNewCategory`}>
                <button className="button-add-new-category">
                    <img src={IconANC} alt="" />
                    <h2>Add New Category</h2>
                </button>            
            </Link>

            <div className='glass-panel3'>
                <Fliter/>
                <div className='dtable'>
                    <table className='home-table'>
                        <tr>
                            <th>Sl. Number</th> 
                            <th>Date</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Edit</th>
                        </tr>
                        {category.map((row, index) => (
                            <tr key={row.id} className='home-table-tr'>
                                <td>
                                    <span className='serial-number'>{('0' + (index + 1)).slice(-2)}</span>
                                </td>
                                <td>{row.date}</td>
                                <td>  
                                    <div key={row.id} style={{backgroundColor: row.color}} className={` category-panel`}>
                                    {row.name}
                                    </div>
                                </td>
                                <td>{row.description}</td>
                                <td>
                                    <div className='but'>
                                        <Link to={`edit/${row.id}`}>
                                        <button className='button-edit'>Edit</button>
                                        </Link>
                                        <Link to={`edit/${row.id}`}>
                                        <button className='button-delete'>Delete</button>
                                        </Link>                                    
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </table>
                </div>
            </div>
        </div>
        </>
    )

}

export default ManageCategory;