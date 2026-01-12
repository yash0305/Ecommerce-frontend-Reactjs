import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerPage from "./pages/CustomerPage";
import SellerPage from "./pages/SellerPage";
import UserRegistrationPage from "./pages/UserRegistrationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/seller" element={<SellerPage />} />
      </Routes>
    </>
  );
}

export default App;
