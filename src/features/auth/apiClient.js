import store from "../../store";
import { refreshToken } from "./authSlice";
import { tokenUtils } from "./tokenUtils";

export const apiClient = {
  request: async (url, options = {}) => {
    let accessToken = tokenUtils.getAccessToken();

    // Check if access token is expired or will expire soon
    if (accessToken && tokenUtils.isTokenExpired(accessToken)) {
      try {
        // Dispatch refresh token action
        const result = await store.dispatch(refreshToken()).unwrap();
        accessToken = result.accessToken;
      } catch (error) {
        // Redirect to login if refresh fails
        window.location.href = "/login";
        throw error;
      }
    }

    // Add authorization header
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // If unauthorized, try refreshing token
      if (response.status === 401 && tokenUtils.getRefreshToken()) {
        try {
          const result = await store.dispatch(refreshToken()).unwrap();
          accessToken = result.accessToken;

          // Retry request with new token
          headers["Authorization"] = `Bearer ${accessToken}`;
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          });

          if (!retryResponse.ok) {
            throw new Error("Request failed after token refresh");
          }

          return await retryResponse.json();
        } catch (error) {
          window.location.href = "/login";
          throw error;
        }
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Request failed");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  get: (url, options = {}) => {
    return apiClient.request(url, { ...options, method: "GET" });
  },

  post: (url, data, options = {}) => {
    return apiClient.request(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put: (url, data, options = {}) => {
    return apiClient.request(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: (url, options = {}) => {
    return apiClient.request(url, { ...options, method: "DELETE" });
  },
};
