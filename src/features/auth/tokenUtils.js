export const tokenUtils = {
  // Decode JWT token
  decodeToken: (token) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: (token) => {
    const decoded = tokenUtils.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    // Check if token expires in next 60 seconds (sliding window)
    return decoded.exp * 1000 < Date.now() + 60000;
  },

  // Get access token
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },

  // Get refresh token
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
};
