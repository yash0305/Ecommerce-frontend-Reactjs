export const jwtUtils = {
  decodeToken: (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  },

  isTokenExpired: (token) => {
    const decoded = jwtUtils.decodeToken(token);
    if (!decoded?.exp) return true;
    return decoded.exp * 1000 < Date.now() + 60000;
  },

  getRoleFromToken: (token) => {
    return jwtUtils.decodeToken(token)?.role || null;
  },

  getUsernameFromToken: (token) => {
    return jwtUtils.decodeToken(token)?.sub || null;
  },

  getRoleBasedPath: (role) => {
    const map = {
      ADMIN: "/admin",
      SELLER: "/seller",
      CUSTOMER: "/customer",
    };
    return map[role] || "/";
  },
};
