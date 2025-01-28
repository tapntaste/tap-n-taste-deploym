import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@tap-n-taste/hooks'; // Ensure correct import

interface RestaurantState {
  restaurantData: any; // Data of the newly created restaurant
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurantData: null,
  loading: false,
  error: null,
};

// Thunk to create a new restaurant
export const createRestaurantThunk = createAsyncThunk(
  'restaurant/createRestaurant',
  async (
    restaurantData: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/restaurants`, // Adjust the endpoint for creating a restaurant
        restaurantData
      );
      return response.data; // Assuming the API returns the created restaurant data
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
// Thunk for updating the restaurant
export const updateRestaurantThunk = createAsyncThunk(
    'restaurant/updateRestaurant',
    async (
      {
        restaurantId, 
        restaurantData
      }: { restaurantId: any; restaurantData: any },
      { rejectWithValue }
    ) => {
      try {
        const response = await axiosInstance.put(
          `/restaurants/${restaurantId}`, 
          restaurantData
        );
        return response.data; // Return the updated restaurant data
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
      // Handle createRestaurant thunk
      .addCase(createRestaurantThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRestaurantThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.restaurantData = action.payload; // Store the created restaurant data
      })
      .addCase(createRestaurantThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
       // Handle updateRestaurantThunk
       .addCase(updateRestaurantThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateRestaurantThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.restaurantData = action.payload; // Store the updated restaurant data
        }
      )
      .addCase(updateRestaurantThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Store any error that occurred
      });
  },
});

export default restaurantSlice.reducer;
