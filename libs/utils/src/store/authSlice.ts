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

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
      return true; // Logout successful
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to log out.');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer to set user data from localStorage
    // setUser: (state, action: PayloadAction<any>) => {
    //   state.isAuthenticated = true;
    //   state.userData = action.payload;
    // },
    setUser: (state, action: PayloadAction<any>) => {
      const { user, timestamp } = action.payload;
      const currentTime = new Date().getTime();
    
      // Check if the data is still valid (3 days = 3 * 24 * 60 * 60 * 1000 ms)
      if (currentTime - timestamp < 3 * 24 * 60 * 60 * 1000) {
        state.isAuthenticated = true;
        state.userData = user;
      } else {
        state.isAuthenticated = false;
        state.userData = null;
        localStorage.removeItem('user'); // Clear expired data
      }
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
      // .addCase(authenticateUser.fulfilled, (state, action: PayloadAction<any>) => {
      //   state.loading = false;
      //   state.isAuthenticated = true;
      //   state.userData = action.payload.user;
      //   localStorage.setItem('user', JSON.stringify(action.payload.user)); // Cache user data
      // })
      .addCase(authenticateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      
        // Save user data with a timestamp in localStorage
        localStorage.setItem(
          'user',
          JSON.stringify({ user: action.payload.user, timestamp: new Date().getTime() })
        );
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
      
        // Save user data with a timestamp in localStorage
        localStorage.setItem(
          'user',
          JSON.stringify({ user: action.payload, timestamp: new Date().getTime() })
        );
      })      
      // .addCase(fetchUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.isAuthenticated = true;
      //   state.userData = action.payload;
      //   localStorage.setItem('user', JSON.stringify(action.payload.user)); // Cache user data
      // })
      // .addCase(fetchUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.userData = null;
        localStorage.removeItem('user'); // Clear invalid data
      })
      
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userData = null;
        localStorage.removeItem('user'); // Clear localStorage
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
