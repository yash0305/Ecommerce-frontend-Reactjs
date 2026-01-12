import React, { useState } from "react";

export default function SellersManagement() {
  const [sellers, setSellers] = useState([
    {
      id: 1,
      username: "john_seller",
      mobileNumber: "+1234567890",
      email: "john@example.com",
      status: "PENDING",
      emailVerified: false,
      mobileVerified: false,
    },
    {
      id: 2,
      username: "jane_merchant",
      mobileNumber: "+1987654321",
      email: "jane@example.com",
      status: "APPROVED",
      emailVerified: true,
      mobileVerified: true,
    },
    {
      id: 3,
      username: "mike_store",
      mobileNumber: "+1122334455",
      email: "mike@example.com",
      status: "REJECTED",
      emailVerified: true,
      mobileVerified: false,
    },
  ]);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    mobileNumber: "",
    email: "",
    status: "PENDING",
    emailVerified: false,
    mobileVerified: false,
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
    setShowDetailModal(true);
  };

  const handleOpenUpdate = (seller) => {
    setFormData(seller);
    setShowUpdateModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setSellers(
      sellers.map((seller) => (seller.id === formData.id ? formData : seller))
    );
    setShowUpdateModal(false);
    setFormData({
      id: "",
      username: "",
      mobileNumber: "",
      email: "",
      status: "PENDING",
      emailVerified: false,
      mobileVerified: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-100">
      {" "}
      {/* Changed from lg:ml-64 and added responsive padding */}
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Sellers Management
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Manage and review seller accounts
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Username
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Mobile Number
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold hidden sm:table-cell">
                    Email Verified
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold hidden sm:table-cell">
                    Mobile Verified
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sellers.map((seller) => (
                  <tr
                    key={seller.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900">
                      {seller.username}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900">
                      {seller.mobileNumber}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900">
                      {seller.email}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                      <span
                        className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                          seller.status
                        )}`}
                      >
                        {seller.status}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm hidden sm:table-cell">
                      <span
                        className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                          seller.emailVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {seller.emailVerified ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm hidden sm:table-cell">
                      <span
                        className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                          seller.mobileVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {seller.mobileVerified ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() => handleViewDetails(seller)}
                          className="px-2 md:px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium whitespace-nowrap"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleOpenUpdate(seller)}
                          className="px-2 md:px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs font-medium"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Detail View Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full transform transition-all duration-300 scale-100">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-bold">Seller Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {selectedSeller && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">ID</p>
                    <p className="text-gray-900 font-medium">
                      {selectedSeller.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Username
                    </p>
                    <p className="text-gray-900 font-medium">
                      {selectedSeller.username}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Mobile Number
                    </p>
                    <p className="text-gray-900 font-medium">
                      {selectedSeller.mobileNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Email</p>
                    <p className="text-gray-900 font-medium">
                      {selectedSeller.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Status
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                        selectedSeller.status
                      )}`}
                    >
                      {selectedSeller.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Email Verified
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedSeller.emailVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedSeller.emailVerified ? "Yes" : "No"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Mobile Verified
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedSeller.mobileVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedSeller.mobileVerified ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full transform transition-all duration-300 scale-100">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-bold">Update Seller</h2>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailVerified"
                    checked={formData.emailVerified}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Email Verified
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="mobileVerified"
                    checked={formData.mobileVerified}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Mobile Verified
                  </span>
                </label>
              </div>
            </form>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <button
                onClick={() => setShowUpdateModal(false)}
                type="button"
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={handleUpdate}
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
