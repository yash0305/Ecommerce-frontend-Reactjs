import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import SellersManagement from "../components/SellersManagement";

function SellerPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Fixed on desktop */}
      <Sidebar />

      {/* Main Content Area - Responsive */}
      <div className="flex-1 w-full lg:ml-64">
        <Routes>
          <Route path="/admin/sellers" element={<SellersManagement />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default SellerPage;
