import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import SellerManagement from "../components/SellerManagement";

function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 w-full lg:ml-64">
        <Routes>
          <Route path="sellers" element={<SellerManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
