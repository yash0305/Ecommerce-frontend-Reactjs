import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "./authAPI";
import { jwtUtils } from "./jwtUtils";
// Thunk: Login
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(data.username, data.password);
      const { accessToken, refreshToken } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = jwtUtils.decodeToken(accessToken);

      return {
        accessToken,
        refreshToken,
        user: { username: decoded.sub, role: decoded.role },
      };
    } catch {
      return rejectWithValue("Invalid credentials");
    }
  },
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("refreshToken");
      const res = await authAPI.refreshToken(token);

      localStorage.setItem("accessToken", res.data.accessToken);

      const decoded = jwtUtils.decodeToken(res.data.accessToken);

      return {
        accessToken: res.data.accessToken,
        user: { username: decoded.sub, role: decoded.role },
      };
    } catch {
      localStorage.clear();
      return rejectWithValue("Session expired");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const token = localStorage.getItem("refreshToken");
  if (token) await authAPI.logout(token);
  localStorage.clear();
});

const initialState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: localStorage.getItem("accessToken")
    ? jwtUtils.decodeToken(localStorage.getItem("accessToken"))
    : null,
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
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
      .addCase(login.fulfilled, (s, a) =>
        Object.assign(s, a.payload, { isAuthenticated: true }),
      )
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
      .addCase(refreshToken.fulfilled, (s, a) =>
        Object.assign(s, a.payload, { isAuthenticated: true }),
      )
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
      .addCase(logout.fulfilled, (s) => Object.assign(s, initialState))
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
