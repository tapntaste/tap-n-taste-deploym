import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@tap-n-taste/hooks';

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

// Async thunk to fetch user data from the backend
// Async Thunk to Fetch User Data
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/fetch-user');
      return response.data.user; // Return the user data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

// Async thunk for authentication (login or signup)
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
    // Reducer to set user data from localStorage
    setUser: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    // Reducer to handle logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      localStorage.removeItem('user'); // Clear localStorage
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
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Cache user data
      })
      .addCase(authenticateUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userData = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Cache user data
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
