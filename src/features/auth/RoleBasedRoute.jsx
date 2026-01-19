import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtUtils } from "../auth/jwtUtils";

export default function RoleBasedRoute({ children, allowedRoles }) {
  const { user } = useSelector((s) => s.auth);

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to={jwtUtils.getRoleBasedPath(user?.role)} />;
  }
  return children;
}
