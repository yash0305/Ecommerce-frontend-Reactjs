import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerPage from "./pages/CustomerPage";
import SellerPage from "./pages/SellerPage";
import UserRegistrationPage from "./pages/UserRegistrationPage";
import Login from "./components/Login";
import AdminPage from "./pages/AdminPage";
import RoleBasedRoute from "./features/auth/RoleBasedRoute";
import { useEffect } from "react";
import { jwtUtils } from "./features/auth/jwtUtils";
import store from "./store";
import { refreshToken } from "./features/auth/authSlice";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && jwtUtils.isTokenExpired(token)) {
      store.dispatch(refreshToken());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/customer" element={<CustomerPage />} /> */}
        {/* <Route path="/admin/*" element={<AdminPage />} /> */}

        {/* <Route
            path="/seller"
            element={
              <RoleBasedRoute allowedRoles={['SELLER']}>
                <SellerDashboard />
              </RoleBasedRoute>
            }
          /> */}

        {/* <Route
            path="/customer"
            element={
              <RoleBasedRoute allowedRoles={['CUSTOMER']}>
                <CustomerDashboard />
              </RoleBasedRoute>
            }
          /> */}

        <Route
          path="/admin/*"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <AdminPage />
            </RoleBasedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
