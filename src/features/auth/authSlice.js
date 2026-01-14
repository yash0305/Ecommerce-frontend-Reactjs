import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "./authAPI";
import { jwtUtils } from "./jwtUtils";
// Thunk: Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(username, password);

      // Store tokens
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      // Decode token to get user info
      const decoded = jwtUtils.decodeToken(response.accessToken);

      return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: {
          username: decoded.sub,
          role: decoded.role,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Thunk: Refresh Token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = localStorage.getItem("refreshToken");

      if (!refreshTokenValue) {
        throw new Error("No refresh token available");
      }

      const response = await authAPI.refreshToken(refreshTokenValue);

      // Update access token
      localStorage.setItem("accessToken", response.accessToken);

      // Decode new token
      const decoded = jwtUtils.decodeToken(response.accessToken);

      return {
        accessToken: response.accessToken,
        user: {
          username: decoded.sub,
          role: decoded.role,
        },
      };
    } catch (error) {
      // Clear tokens on refresh failure
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return rejectWithValue(error.message || "Token refresh failed");
    }
  }
);

// Thunk: Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = localStorage.getItem("refreshToken");

      // Call logout API if refresh token exists
      if (refreshTokenValue) {
        try {
          await authAPI.logout(refreshTokenValue);
        } catch (error) {
          console.error("Logout API call failed:", error);
        }
      }

      // Clear tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return null;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

// Load initial state from localStorage
const loadInitialState = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken && !jwtUtils.isTokenExpired(accessToken)) {
    const decoded = jwtUtils.decodeToken(accessToken);
    return {
      user: {
        username: decoded.sub,
        role: decoded.role,
      },
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    };
  }

  return {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Refresh Token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
