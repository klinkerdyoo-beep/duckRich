import { AppRoutes  } from "./Routes.jsx";
import './App.css';
import trainImg from "./assets/train.png";
import cloudImg from "./assets/cloud1.png";
import cloudImg2 from "./assets/cloud2.png";
import vector76Img from "./assets/vector76.png";

    const App = () => {
    return (
        <>
        <img src={vector76Img} className="vector" alt="vector" />
        <img src={trainImg} className="train" alt="train" />
        <img src={cloudImg} className="cloud1" alt="cloud" />
        <img src={cloudImg2} className="cloud2" alt="cloud" />
        <AppRoutes />
        </>
    );
};

export default App;