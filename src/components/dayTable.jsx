
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import wallets from "../data/wallets";
import * as LucideIcons from "lucide-react";

const CategoryIcon = ({ icon, size = 20, color = "currentColor" }) => {
  const IconComponent = LucideIcons[icon];

  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} />;
};


const DayTable = ({transaction,walletMap,categoryMap}) =>{
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
                    {transaction.map((row,index) => (
                        <tr key={row.id} className='home-table-tr'>
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

                                    {/* <div className="record-wallet-info tiny">
                                     <h3>{wallet.name}</h3>
                                    </div> */}
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
                                        {/* <Trash2 className="text-red-500 w-5 h-5 inline-blocktransform hover:scale-125 transition-transform duration-200" />  */}
                                        <Trash2 className="trash-icon" /> 
                                    </Link>                                    
                                </div>  
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            </div>        
        )
    

}

export default DayTable;