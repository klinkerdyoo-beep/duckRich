import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import  Home  from "./pages/Home";
import CreateDailyRecord from "./pages/CreateDailyRecord";
import EditRecord from "./pages/EditRecord";
import DailyRecord from "./pages/DailyRecord";
import DashboardCategory from "./pages/DashboardCategory";

export const AppRoutes  = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createDailyRecord" element={<CreateDailyRecord />} />
                <Route path="/edit/:id" element={<EditRecord />} />
                <Route path="/dailyRecord" element={<DailyRecord />} />
                <Route path="/dashboardCategory" element={<DashboardCategory />} />
            </Routes>
        </Router>   
    )
}