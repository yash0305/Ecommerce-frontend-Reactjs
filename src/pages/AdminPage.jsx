import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import SellerManagement from "../components/SellerManagement";
import { RoleBasedRoute } from "../features/auth/RoleBasedRoute";

function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 w-full lg:ml-40">
        <Routes>
          <Route
            path="sellers"
            element={
              <RoleBasedRoute allowedRoles={["ADMIN"]}>
                <SellerManagement />
              </RoleBasedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
