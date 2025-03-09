import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "../apis/userApi";
import { LoginRequest, User, LoginResponse } from "../../../types/user";
import { RootState } from "./store";

// Define the authentication state interface
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  fetchSuccess: string | null;
  updateLoading: boolean;
  updateError: string | null;
  updateSuccess: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token:
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null,
  isAuthenticated:
    typeof window !== "undefined" ? !!localStorage.getItem("authToken") : false,
  loading: false,
  error: null,
  fetchSuccess: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: null,
};

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await userApi.login(credentials);
      if (!response.success) {
        return rejectWithValue(response.message || "Login failed");
      }
      return response;
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      return rejectWithValue(
        errorResponse.response?.data?.message ||
          errorResponse.message ||
          "Login failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await userApi.logout();
      return true;
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      return rejectWithValue(errorResponse.message || "Logout failed");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const profile = await userApi.getProfile();
      if (!profile) {
        return rejectWithValue("No user profile found");
      }
      return profile;
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      return rejectWithValue(
        errorResponse.response?.data?.message ||
          errorResponse.message ||
          "Failed to fetch user profile"
      );
    }
  }
);

interface UpdateUserPayload {
  userId: string;
  data: Record<string, string | number | boolean>;
}

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userId, data }: UpdateUserPayload, { rejectWithValue }) => {
    try {
      const updatedUser = await userApi.updateUser(userId, data);
      if (!updatedUser) {
        return rejectWithValue("Failed to update user profile");
      }
      return updatedUser;
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      return rejectWithValue(
        errorResponse.response?.data?.message ||
          errorResponse.message ||
          "Failed to update user profile"
      );
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearFetchSuccess: (state) => {
      state.fetchSuccess = null;
    },
    clearUpdateSuccess: (state) => {
      state.updateSuccess = null;
    },
    clearUpdateError: (state) => {
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.data?.user || null;
          state.token = action.payload.data?.token || null;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fetchSuccess = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.fetchSuccess = "User data fetched successfully!";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.updateLoading = false;
        state.user = action.payload;
        state.updateSuccess = "User updated successfully!";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearError, clearFetchSuccess, clearUpdateSuccess, clearUpdateError } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectFetchSuccess = (state: RootState) => state.auth.fetchSuccess;
export const selectUpdateLoading = (state: RootState) => state.auth.updateLoading;
export const selectUpdateError = (state: RootState) => state.auth.updateError;
export const selectUpdateSuccess = (state: RootState) => state.auth.updateSuccess;
