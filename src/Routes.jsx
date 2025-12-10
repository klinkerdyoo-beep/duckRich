import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import  Home  from "./pages/Home";
// import  Edit  from "./pages/Edit";

export const AppRoutes  = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/edit/:id" element={<Edit />} /> */}
            </Routes>
        </Router>   
    )
}