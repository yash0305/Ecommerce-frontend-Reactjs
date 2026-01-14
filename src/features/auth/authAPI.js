const API_BASE_URL = "http://localhost:8080/user";

export const authAPI = {
  // Login
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Invalid credentials");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refreshToken),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async (refreshToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refreshToken),
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      return true;
    } catch (error) {
      console.error("Logout API error:", error);
      throw error;
    }
  },
};
