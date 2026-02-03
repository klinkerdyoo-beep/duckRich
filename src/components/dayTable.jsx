
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import wallets from "../data/wallets";
import * as LucideIcons from "lucide-react";
import React from "react";

const CategoryIcon = ({ icon, size = 20, color = "currentColor" }) => {
  const IconComponent = LucideIcons[icon];

  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} />;
};

const toThaiDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return null;

  return d.toLocaleDateString("th-TH");
};


const DayTable = ({transaction,walletMap,categoryMap}) =>{

    const sumByDay = transaction.reduce((acc, row) => {
        const day = toThaiDate(row.date);
        if (!acc[day]) {
            acc[day] = { EX: 0, IN: 0 };
        }

        acc[day][row.type] += Number(row.amount);
        return acc;
    },{});

    return(
                <div className='dtable'>
            <table className="home-table">
                <thead>
                    <tr> 
                        <th></th> 
                        <th>Date</th>
                        <th>Wallet</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Note</th>
                        <th>Amount</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                    
                <tbody>
                    {transaction.map((row,index) => {
                        const loopDay = toThaiDate(row.date);
                        let preDay = 'null';
                        if (index  < transaction.length - 1) {
                            preDay = toThaiDate(transaction[index + 1].date);
                        }
                         const isSameDay = loopDay && preDay && loopDay === preDay;
                        //  console.log(`loopDay: ${loopDay}`);
                        //  console.log(`preDay: ${preDay}`);
                        //  console.log(`isSameDay: ${isSameDay}`);

                        //  console.log(`sumEx: ${sumEx}`)
                        return(
                        <React.Fragment key={row.id}>
                        <tr  className='home-table-tr'>
                            <td>
                                <span className='serial-number'>{('0' + (index + 1)).slice(-2)}</span>
                            </td>
                            <td>{new Date(row.date).toLocaleDateString("th-TH")}</td>
                            <td>
                            {walletMap[row.wallet_id] ? (() => {
                                const wallet = walletMap[row.wallet_id];

                                return (
                                <div className='wallet-cell'>
                                    <div className="record-wallet-show tiny">
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

                                </div>
                                );
                            })() : (
                                "-"
                            )}
                            </td>

                            <td style={{fontWeight: "bold", color: row.type === "IN" ? "green" : "red" }}>{row.type === "IN" ? "INCOME" : "EXPENSE"}</td>
                            <td className="category-panel-show"
                            style={{
                                backgroundColor: categoryMap[row.category_id]?.color || "#eee",color: "white"}}
                                >
                                {(() => {
                                    const category = categoryMap[row.category_id];

                                    if (!category) return "-";

                                    return (
                                    <>
                                        <CategoryIcon
                                        icon={category.icon}
                                        size={14}
                                        color="#fff"
                                        />
                                        <span>{category.name}</span>
                                    </>
                                    );
                                })()}
                            </td>

                            <td>{row.note}</td>
                            <td>{row.type === "EX" ? "-" : "+"}{row.amount}</td>
                            <td>
                                <div className='inline-flex gap-1'>
                                    <Link to={`edit/${row.id}`} className="" >
                                    <Pencil className="pencil-icon"/>
                                    </Link>
                                    <Link to={`edit/${row.id}`} className="">
                                        <Trash2 className="trash-icon" /> 
                                    </Link>                                    
                                </div>  
                            </td>

                        </tr>
                        {!isSameDay &&(
                            <tr>
                                <td colSpan={20}>
                                <div className="">


                                        <div className="flex justify-end gap-10 ml-9 mr-4 text-red-500">
                                            <h2>Total Expense:</h2>
                                            <p>{sumByDay[toThaiDate(row.date)].EX ?? 0}</p>                                            
                                        </div>

                                        <div className="flex justify-end gap-10 ml-9 mr-4 text-green-500">

                                            <h2>Total Income:</h2>
                                            <p>{sumByDay[toThaiDate(row.date)].IN ?? 0}</p>                                            
                                        </div>

                                        <div className="flex justify-end gap-10 ml-9 mr-4">

                                            <h2>Net Balance:</h2>
                                            <p>{(sumByDay[toThaiDate(row.date)]?.IN ?? 0) - (sumByDay[toThaiDate(row.date)]?.EX ?? 0)}</p>                                            
                                        </div>
                                        <hr className="bg-red-400 h-1" />

                                </div>
                                </td>
                            </tr>
                            )}
                        </React.Fragment>
                    )})}                        
                </tbody>

            </table>
            </div>        
        )
    

}

export default DayTable;