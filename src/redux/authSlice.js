import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "./apiConfig";

const apiRequest = async (url, method, body = null, token = null) => {
  const headers = { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "An error occurred");
  return data.body;
};

// Async thunks
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    return await apiRequest(API_CONFIG.LOGIN, "POST", credentials);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchUserProfile = createAsyncThunk("auth/fetchUserProfile", async (token, { rejectWithValue }) => {
  try {
    return await apiRequest(API_CONFIG.PROFILE, "POST", null, token);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async ({ firstName, lastName, token }, { rejectWithValue }) => {
  try {
    return await apiRequest(API_CONFIG.PROFILE, "PUT", { firstName, lastName }, token);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  userName: null,
  firstName: null,
  lastName: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Object.assign(state, { ...initialState, isLoggedIn: false });
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Connexion
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.token = payload.token;
        localStorage.setItem("token", payload.token);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
      })

      // Profil
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        Object.assign(state, {
          userName: payload.firstName,
          firstName: payload.firstName,
          lastName: payload.lastName,
          error: null,
        });
      })
      .addCase(fetchUserProfile.rejected, (state, { payload }) => {
        state.error = payload;
      })

      // Mise à jour du profil
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        Object.assign(state, {
          firstName: payload.firstName,
          lastName: payload.lastName,
          error: null,
        });
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
