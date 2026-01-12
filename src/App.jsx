import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerPage from "./pages/CustomerPage";
import SellerPage from "./pages/SellerPage";
import UserRegistrationPage from "./pages/UserRegistrationPage";
import Login from "./components/Login";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
