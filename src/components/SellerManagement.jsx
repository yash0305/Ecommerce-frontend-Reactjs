// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchSellers,
//   updateSeller,
//   clearError,
// } from "../features/admin/adminSlice";
// import DetailModal from "../components/common/DetailModal";
// import UpdateModal from "../components/common/UpdateModal";
// import StatusBadge from "../components/common/StatusBadge";
// import VerifiedBadge from "../components/common/VerifiedBadge";
// import SkeletonRow from "../components/common/SkeletonRow";
// import DESIGN_TOKENS from "../components/constants/designTokens";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellers,
  approveSeller,
  rejectSeller,
  deleteSeller,
  updateSeller,
  clearError,
  clearSuccess,
} from "../features/admin/adminSlice";

const SellerManagement = () => {
  const dispatch = useDispatch();
  const { sellers, loading, updateLoading, error, success } = useSelector(
    (state) => state.admin,
  );

  useEffect(() => {
    console.log("Component mounted, fetching sellers...");
    dispatch(fetchSellers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error occurred:", error);
      alert(`Error: ${error}`);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      console.log("Success:", success);
      alert(success);
      dispatch(clearSuccess());
      dispatch(fetchSellers()); // Refresh the list
    }
  }, [success, dispatch]);

  const handleApprove = (sellerId) => {
    if (window.confirm("Are you sure you want to approve this seller?")) {
      console.log("Approving seller:", sellerId);
      dispatch(approveSeller(sellerId));
    }
  };

  const handleReject = (sellerId) => {
    if (window.confirm("Are you sure you want to reject this seller?")) {
      console.log("Rejecting seller:", sellerId);
      dispatch(rejectSeller(sellerId));
    }
  };

  const handleDelete = (sellerId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this seller? This action cannot be undone.",
      )
    ) {
      console.log("Deleting seller:", sellerId);
      dispatch(deleteSeller(sellerId));
    }
  };

  const handleUpdate = (seller) => {
    // Example: You can open a modal or form to edit seller details
    const updatedData = {
      id: seller.id,
      name: prompt("Enter new name:", seller.name) || seller.name,
      // Add more fields as needed
    };

    dispatch(updateSeller(updatedData));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Loading sellers...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage Sellers</h1>
        <p className="text-gray-600 mt-2">Total Sellers: {sellers.length}</p>
      </div>

      {sellers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg">No sellers found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {seller.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {seller.name || seller.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {seller.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {seller.mobileNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seller.status === "APPROVED" || seller.approved === true
                          ? "bg-green-100 text-green-800"
                          : seller.status === "REJECTED" ||
                              seller.approved === false
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {seller.status ||
                        (seller.approved === true
                          ? "APPROVED"
                          : seller.approved === false
                            ? "REJECTED"
                            : "PENDING")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {seller.status !== "APPROVED" &&
                        seller.approved !== true && (
                          <button
                            onClick={() => handleApprove(seller.id)}
                            disabled={updateLoading}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                          >
                            Approve
                          </button>
                        )}
                      {seller.status !== "REJECTED" &&
                        seller.approved !== false && (
                          <button
                            onClick={() => handleReject(seller.id)}
                            disabled={updateLoading}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                          >
                            Reject
                          </button>
                        )}
                      <button
                        onClick={() => handleDelete(seller.id)}
                        disabled={updateLoading}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {updateLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-lg font-semibold">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerManagement;
