export const jwtUtils = {
  // Decode JWT token
  decodeToken: (token) => {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  // Check if token is expired (with 60 second buffer for sliding window)
  isTokenExpired: (token) => {
    const decoded = jwtUtils.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < Date.now() + 60000;
  },

  // Get role from token
  getRoleFromToken: (token) => {
    const decoded = jwtUtils.decodeToken(token);
    return decoded?.role || null;
  },

  // Get username from token
  getUsernameFromToken: (token) => {
    const decoded = jwtUtils.decodeToken(token);
    return decoded?.sub || null;
  },

  // Get redirect path based on role
  getRoleBasedPath: (role) => {
    const roleRoutes = {
      SELLER: "/seller",
      CUSTOMER: "/customer",
      ADMIN: "/admin",
    };
    return roleRoutes[role] || "/";
  },
};
