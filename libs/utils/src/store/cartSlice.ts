import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@tap-n-taste/hooks'; // Ensure correct import

// Define Cart Item structure with menuItemId and quantity


interface CartState {
  cartItems:any; // Array of cart items, each with menuItemId and quantity
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

// Thunk to fetch all cart items for a user
export const fetchCartItemsThunk = createAsyncThunk(
  'cart/fetchCartItems',
  async (
    { userId, restaurantId }: { userId: string; restaurantId: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/restaurants/${restaurantId}/user/${userId}/cart`
      );
      return response.data.cart; // Assuming the API returns an array of cart items
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Thunk to add menu item to cart
export const addMenuItemToCartThunk = createAsyncThunk(
  'cart/addMenuItem',
  async (
    {
      userId,
      menuItemId,
      restaurantId,
      quantity = 1,
    }: {
      userId: string;
      menuItemId: string;
      restaurantId: any;
      quantity: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/restaurants/${restaurantId}/user/${userId}/cart`,
        { menuItemId, quantity }
      );

      return response.data.cart; // Assuming the cart is returned with updated items
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Thunk to remove menu item from cart
export const removeMenuItemFromCartThunk = createAsyncThunk(
  'cart/removeMenuItem',
  async (
    {
      userId,
      menuItemId,
      restaurantId,
    }: { userId: string; menuItemId: string; restaurantId: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.delete(
        `/restaurants/${restaurantId}/user/${userId}/cart`,
        { data: { menuItemId } }
      );
      return response.data.cart; // Assuming the updated cart is returned
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ menuItemId: string; quantity: number }>
    ) => {
      const { menuItemId, quantity } = action.payload;
      console.log('Current State:', state);
      console.log('Cart Items:', state.cartItems);
    
      if (!state.cartItems) {
        state.cartItems = [];
      }
    
      const item = state.cartItems.find((item: any) => {
        console.log('Item:', item);
        
        return item.menuItem._id=== menuItemId
      });
      if (item) {
        item.quantity = quantity;
      } else {
        console.warn('Item not found:', menuItemId);
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCartItems thunk
      .addCase(fetchCartItemsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCartItemsThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.cartItems = action.payload; // Update cartItems with fetched data
        }
      )
      .addCase(fetchCartItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle addMenuItem thunk
      .addCase(addMenuItemToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addMenuItemToCartThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.cartItems = action.payload; // Update cartItems after adding a menu item
        }
      )
      .addCase(addMenuItemToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle removeMenuItem thunk
      .addCase(removeMenuItemFromCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeMenuItemFromCartThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.cartItems = action.payload; // Update cartItems after removing a menu item
        }
      )
      .addCase(removeMenuItemFromCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { updateCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
