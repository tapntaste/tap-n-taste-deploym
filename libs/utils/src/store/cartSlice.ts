import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@tap-n-taste/hooks'; // Ensure correct import

interface CartState {
  cartItems: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

// Thunk to add menu item to cart
export const addMenuItemToCartThunk = createAsyncThunk(
  'cart/addMenuItem',
  async ({ userId, menuItemId ,restaurantId}: { userId: string; menuItemId: string,restaurantId:any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/restaurants/${restaurantId}/user/${userId}/cart`,
        { menuItemId }
      );
      return response.data.cart;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Thunk to remove menu item from cart
export const removeMenuItemFromCartThunk = createAsyncThunk(
  'cart/removeMenuItem',
  async ({ userId, menuItemId ,restaurantId}: { userId: string; menuItemId: string ,restaurantId:any}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/your-restaurant-id/user/${userId}/cart`,
        { data: { menuItemId } }
      );
      return response.data.cart;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle addMenuItem thunk
      .addCase(addMenuItemToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMenuItemToCartThunk.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(addMenuItemToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle removeMenuItem thunk
      .addCase(removeMenuItemFromCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMenuItemFromCartThunk.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeMenuItemFromCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
