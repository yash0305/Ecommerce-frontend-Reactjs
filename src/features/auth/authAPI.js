const API_BASE_URL = "YOUR_API_ENDPOINT"; // Replace with your API URL

export const authAPI = {
  // Login
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
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

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Logout (optional)
  logout: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Logout API error:", error);
      return false;
    }
  },
};
