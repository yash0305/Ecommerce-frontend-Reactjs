import DESIGN_TOKENS from "../constants/designTokens";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className={`bg-white ${DESIGN_TOKENS.radius} ${DESIGN_TOKENS.shadow} max-w-2xl w-full ${DESIGN_TOKENS.transition}`}
      >
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className={`text-white hover:text-gray-200 ${DESIGN_TOKENS.transition}`}
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
        <div className={DESIGN_TOKENS.spacing.card}>{children}</div>
        {footer && (
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
