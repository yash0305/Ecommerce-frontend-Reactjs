import { useState, useEffect } from "react";
import Modal from "./Modal";
import DESIGN_TOKENS from "../constants/designTokens";

const UpdateModal = ({ seller, isOpen, onClose, onUpdate, loading }) => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    mobileNumber: "",
    email: "",
    status: "PENDING",
    emailVerified: false,
    mobileVerified: false,
  });

  useEffect(() => {
    if (seller) {
      setFormData(seller);
    }
  }, [seller]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Seller"
      footer={
        <>
          <button
            onClick={onClose}
            type="button"
            className={`px-6 py-2.5 ${DESIGN_TOKENS.colors.secondary} text-white ${DESIGN_TOKENS.radius} ${DESIGN_TOKENS.transition} font-medium`}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className={`px-6 py-2.5 ${DESIGN_TOKENS.colors.primary} text-white ${DESIGN_TOKENS.radius} ${DESIGN_TOKENS.transition} font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block ${DESIGN_TOKENS.typography.label} mb-2`}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full ${DESIGN_TOKENS.spacing.input} border border-gray-300 ${DESIGN_TOKENS.radius} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${DESIGN_TOKENS.transition}`}
            required
          />
        </div>

        <div>
          <label className={`block ${DESIGN_TOKENS.typography.label} mb-2`}>
            Mobile Number
          </label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            className={`w-full ${DESIGN_TOKENS.spacing.input} border border-gray-300 ${DESIGN_TOKENS.radius} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${DESIGN_TOKENS.transition}`}
            required
          />
        </div>

        <div>
          <label className={`block ${DESIGN_TOKENS.typography.label} mb-2`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full ${DESIGN_TOKENS.spacing.input} border border-gray-300 ${DESIGN_TOKENS.radius} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${DESIGN_TOKENS.transition}`}
            required
          />
        </div>

        <div>
          <label className={`block ${DESIGN_TOKENS.typography.label} mb-2`}>
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className={`w-full ${DESIGN_TOKENS.spacing.input} border border-gray-300 ${DESIGN_TOKENS.radius} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${DESIGN_TOKENS.transition}`}
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="emailVerified"
              checked={formData.emailVerified}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className={DESIGN_TOKENS.typography.label}>
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
            <span className={DESIGN_TOKENS.typography.label}>
              Mobile Verified
            </span>
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateModal;
