import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// Create axios instance with interceptor
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token attached:", token.substring(0, 20) + "...");
    } else {
      console.warn("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/user/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem("accessToken", accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Async thunk for fetching sellers
export const fetchSellers = createAsyncThunk(
  "admin/fetchSellers",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching sellers...");
      const response = await api.get("/admin/sellers");
      console.log("Sellers fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch sellers error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sellers"
      );
    }
  }
);

// Async thunk for updating seller
export const updateSeller = createAsyncThunk(
  "admin/updateSeller",
  async (sellerData, { rejectWithValue }) => {
    try {
      console.log("Updating seller:", sellerData.id);
      const response = await api.put(
        `/admin/sellers/${sellerData.id}`,
        sellerData
      );
      console.log("Seller updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update seller error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update seller"
      );
    }
  }
);

// Async thunk for approving seller
export const approveSeller = createAsyncThunk(
  "admin/approveSeller",
  async (sellerId, { rejectWithValue }) => {
    try {
      console.log("Approving seller:", sellerId);
      const response = await api.put(`/admin/sellers/${sellerId}/approve`);
      console.log("Seller approved successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Approve seller error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve seller"
      );
    }
  }
);

// Async thunk for rejecting seller
export const rejectSeller = createAsyncThunk(
  "admin/rejectSeller",
  async (sellerId, { rejectWithValue }) => {
    try {
      console.log("Rejecting seller:", sellerId);
      const response = await api.put(`/admin/sellers/${sellerId}/reject`);
      console.log("Seller rejected successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Reject seller error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject seller"
      );
    }
  }
);

// Async thunk for deleting seller
export const deleteSeller = createAsyncThunk(
  "admin/deleteSeller",
  async (sellerId, { rejectWithValue }) => {
    try {
      console.log("Deleting seller:", sellerId);
      await api.delete(`/admin/sellers/${sellerId}`);
      console.log("Seller deleted successfully");
      return sellerId;
    } catch (error) {
      console.error("Delete seller error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete seller"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    sellers: [],
    loading: false,
    error: null,
    updateLoading: false,
    success: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sellers
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
        state.error = null;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update seller
      .addCase(updateSeller.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.success = "Seller updated successfully";
        const index = state.sellers.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
      })
      .addCase(updateSeller.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Approve seller
      .addCase(approveSeller.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(approveSeller.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.success = "Seller approved successfully";
        const index = state.sellers.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
      })
      .addCase(approveSeller.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Reject seller
      .addCase(rejectSeller.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(rejectSeller.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.success = "Seller rejected successfully";
        const index = state.sellers.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
      })
      .addCase(rejectSeller.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Delete seller
      .addCase(deleteSeller.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.success = "Seller deleted successfully";
        state.sellers = state.sellers.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = adminSlice.actions;
export default adminSlice.reducer;
