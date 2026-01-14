import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function RoleBasedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect to role-based dashboard if user doesn't have permission
    const redirectPath = jwtUtils.getRoleBasedPath(user?.role);
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
