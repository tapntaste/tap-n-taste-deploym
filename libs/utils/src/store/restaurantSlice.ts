import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {axiosInstance} from '@tap-n-taste/hooks'; // Ensure correct path

interface RestaurantState {
  restaurantData: any;  // Updated for consistency
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurantData: null,
  loading: false,
  error: null,
};

// Async thunk to fetch restaurant data
export const fetchRestaurantThunk = createAsyncThunk(
  'restaurant/fetchRestaurant',
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/restaurants/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.restaurantData = action.payload;
      })
      .addCase(fetchRestaurantThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default restaurantSlice.reducer;
