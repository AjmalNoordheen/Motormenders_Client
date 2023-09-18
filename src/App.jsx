import { Route, Routes } from "react-router-dom";
import ProfRoutes from "./Routes/ProfRoutes";
import AdminRoutes from "./Routes/adminRoutes";
import UserRoute from "./Routes/UserRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerErrorpage from "./Components/ReuseItems/ServerErrorpage";



function App() {
  return (
    <>
      <Routes>
        <Route path="/proffesional/*" element={<ProfRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoute />} />
        <Route path="/serverError" element={<ServerErrorpage/>} />
      </Routes>
       <ToastContainer autoClose={2000}/> 
    </>
  );
}

export default App;
