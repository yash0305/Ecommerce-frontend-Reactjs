import Modal from "./Modal";
import DESIGN_TOKENS from "../constants/designTokens";
import StatusBadge from "./StatusBadge";
import VerifiedBadge from "./VerifiedBadge";

const DetailModal = ({ seller, isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Seller Details"
    footer={
      <button
        onClick={onClose}
        className={`px-6 py-2.5 ${DESIGN_TOKENS.colors.secondary} text-white ${DESIGN_TOKENS.radius} ${DESIGN_TOKENS.transition} font-medium`}
      >
        Close
      </button>
    }
  >
    {seller && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className={DESIGN_TOKENS.typography.label}>ID</p>
          <p className="text-gray-900 font-medium mt-1">{seller.id}</p>
        </div>
        <div>
          <p className={DESIGN_TOKENS.typography.label}>Username</p>
          <p className="text-gray-900 font-medium mt-1">{seller.username}</p>
        </div>
        <div>
          <p className={DESIGN_TOKENS.typography.label}>Mobile Number</p>
          <p className="text-gray-900 font-medium mt-1">
            {seller.mobileNumber}
          </p>
        </div>
        <div>
          <p className={DESIGN_TOKENS.typography.label}>Email</p>
          <p className="text-gray-900 font-medium mt-1">{seller.email}</p>
        </div>
        <div>
          <p className={DESIGN_TOKENS.typography.label}>Status</p>
          <div className="mt-1">
            <StatusBadge status={seller.status} />
          </div>
        </div>
        <div>
          <p className={DESIGN_TOKENS.typography.label}>Email Verified</p>
          <div className="mt-1">
            <VerifiedBadge verified={seller.emailVerified} />
          </div>
        </div>
        <div>
          <p className={DESIGN_TOKENS.typography.label}>Mobile Verified</p>
          <div className="mt-1">
            <VerifiedBadge verified={seller.mobileVerified} />
          </div>
        </div>
      </div>
    )}
  </Modal>
);

export default DetailModal;
