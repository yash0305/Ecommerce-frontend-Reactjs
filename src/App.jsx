import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerPage from "./pages/CustomerPage";
import SellerPage from "./pages/SellerPage";
import UserRegistrationPage from "./pages/UserRegistrationPage";
import Login from "./components/Login";
import AdminPage from "./pages/AdminPage";
import { RoleBasedRoute } from "./features/auth/RoleBasedRoute";

function App() {
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
