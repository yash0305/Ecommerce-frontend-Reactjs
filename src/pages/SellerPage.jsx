import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";

function SellerPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 w-full lg:ml-64">
        <Routes>
          {/* <Route path="/admin/sellers" element={<SellersManagement />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default SellerPage;
