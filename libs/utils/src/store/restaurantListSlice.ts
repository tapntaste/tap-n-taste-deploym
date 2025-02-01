import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {axiosInstance} from '@tap-n-taste/hooks'; // Ensure correct path

interface Restaurant {
  id: string;
  name: string;
  description?: string;
}

interface RestaurantListState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantListState = {
  restaurants: [],
  loading: false,
  error: null,
};

// Async thunk for fetching the restaurant list
export const fetchRestaurantsThunk = createAsyncThunk(
  'restaurantList/fetchRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Restaurant[]>('/restaurants');
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const restaurantListSlice = createSlice({
  name: 'restaurantList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantsThunk.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurantsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default restaurantListSlice.reducer;
