import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for sending reset password link
export const sendResetLink = createAsyncThunk(
  "user/sendResetLink",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Safely retrieve user and token from localStorage
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
    token: storedToken && storedToken !== "undefined" ? storedToken : null,
    error: null,
    loading: false,
    resetSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      .addCase(sendResetLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetSuccess = false;
      })
      .addCase(sendResetLink.fulfilled, (state) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(sendResetLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send reset link";
        state.resetSuccess = false;
      });
  },
});

// ✅ Single export section
export const { logout, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
