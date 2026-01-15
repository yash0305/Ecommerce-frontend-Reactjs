import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellers,
  updateSeller,
  clearError,
} from "../features/admin/adminSlice";
import DetailModal from "../components/common/DetailModal";
import UpdateModal from "../components/common/UpdateModal";
import StatusBadge from "../components/common/StatusBadge";
import VerifiedBadge from "../components/common/VerifiedBadge";
import SkeletonRow from "../components/common/SkeletonRow";
import DESIGN_TOKENS from "../components/constants/designTokens";

const SellerManagement = () => {
  const dispatch = useDispatch();
  const { sellers, loading, error, updateLoading } = useSelector(
    (state) => state.admin
  );

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    dispatch(fetchSellers());
  }, [dispatch]);

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
    setShowDetailModal(true);
  };

  const handleOpenUpdate = (seller) => {
    setSelectedSeller(seller);
    setShowUpdateModal(true);
  };

  const handleUpdate = async (formData) => {
    const result = await dispatch(updateSeller(formData));
    if (result.type === "admin/updateSeller/fulfilled") {
      setShowUpdateModal(false);
      setSelectedSeller(null);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={DESIGN_TOKENS.spacing.section}>
          <h1 className={DESIGN_TOKENS.typography.heading}>
            Sellers Management
          </h1>
          <p className={`${DESIGN_TOKENS.typography.subheading} mt-2`}>
            Manage and review seller accounts
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className={`bg-red-50 border border-red-200 text-red-700 px-4 py-3 ${DESIGN_TOKENS.radius} ${DESIGN_TOKENS.spacing.section}`}
          >
            <div className="flex justify-between items-center">
              <p className="font-medium">{error}</p>
              <button
                onClick={() => dispatch(clearError())}
                className="text-red-700 hover:text-red-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Table Card */}
        <div
          className={`bg-white ${DESIGN_TOKENS.radius} ${DESIGN_TOKENS.shadow} overflow-hidden`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Username
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Mobile Number
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold hidden sm:table-cell">
                    Email Verified
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold hidden sm:table-cell">
                    Mobile Verified
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : sellers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No sellers found
                    </td>
                  </tr>
                ) : (
                  sellers.map((seller) => (
                    <tr
                      key={seller.id}
                      className={`hover:bg-gray-50 ${DESIGN_TOKENS.transition}`}
                    >
                      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900 font-medium">
                        {seller.username}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-600">
                        {seller.mobileNumber}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-600">
                        {seller.email}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                        <StatusBadge status={seller.status} />
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm hidden sm:table-cell">
                        <VerifiedBadge verified={seller.emailVerified} />
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm hidden sm:table-cell">
                        <VerifiedBadge verified={seller.mobileVerified} />
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleViewDetails(seller)}
                            className={`px-3 py-1.5 ${DESIGN_TOKENS.colors.primary} text-white ${DESIGN_TOKENS.radius} ${DESIGN_TOKENS.transition} text-xs font-medium`}
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleOpenUpdate(seller)}
                            className={`px-3 py-1.5 ${DESIGN_TOKENS.colors.success} text-white ${DESIGN_TOKENS.radius} ${DESIGN_TOKENS.transition} text-xs font-medium`}
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DetailModal
        seller={selectedSeller}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedSeller(null);
        }}
      />

      <UpdateModal
        seller={selectedSeller}
        isOpen={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setSelectedSeller(null);
        }}
        onUpdate={handleUpdate}
        loading={updateLoading}
      />
    </div>
  );
};

export default SellerManagement;
