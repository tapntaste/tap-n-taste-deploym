import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@tap-n-taste/hooks';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  isAuthenticated: boolean;
  userData: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  loading: false,
  error: null,
};

// Async thunk for user authentication (signup or login)
export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (
    { endpoint, payload }: { endpoint: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(endpoint, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Authentication failed.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(authenticateUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
