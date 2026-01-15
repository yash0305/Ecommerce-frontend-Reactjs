const VerifiedBadge = ({ verified }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      verified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }`}
  >
    {verified ? "Yes" : "No"}
  </span>
);

export default VerifiedBadge;
