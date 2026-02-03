import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import  Home  from "./pages/Home";
import CreateDailyRecord from "./pages/CreateDailyRecord";
import EditRecord from "./pages/EditRecord";
import DashboardCategory from "./pages/DashboardCategory";
import ManageCategory from "./pages/ManageCategory";
import AddNewCategory from "./pages/AddNewCategory";
import AddNewWallet from "./pages/AddNewWallet";
import Wallets from "./pages/Wallets";

export const AppRoutes  = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createDailyRecord" element={<CreateDailyRecord />} />
                <Route path="/edit/:id" element={<EditRecord />} />
                <Route path="/dashboardCategory" element={<DashboardCategory />} />
                <Route path="/manageCategory" element={<ManageCategory />} />
                <Route path="/addNewCategory" element={<AddNewCategory />} />
                <Route path="/wallet" element={<Wallets/>} />
                <Route path="/addNewWallet" element={<AddNewWallet/>} />
            </Routes>
        </Router>   
    )
}