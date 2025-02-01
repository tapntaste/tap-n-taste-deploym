import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {axiosInstance} from '@tap-n-taste/hooks'; // Ensure correct path

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isChefSpecial?: boolean;
  isMostLiked?: boolean;
  isFeatured?: boolean;
  [key: string]: any;
}

interface MenuItemsState {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuItemsState = {
  menuItems: [],
  loading: false,
  error: null,
};

// Async thunk to fetch menu items
export const fetchMenuItemsThunk = createAsyncThunk(
  'menuItems/fetchMenuItems',
  async (
    { restaurantId, category, isChefSpecial, isMostLiked, isFeatured }: 
    { restaurantId: string; category?: string; isChefSpecial?: boolean; isMostLiked?: boolean; isFeatured?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const filters: { [key: string]: string | boolean } = {};
      if (category) filters.category = category;
      if (isChefSpecial !== undefined) filters.isChefSpecial = isChefSpecial;
      if (isMostLiked !== undefined) filters.isMostLiked = isMostLiked;
      if (isFeatured !== undefined) filters.isFeatured = isFeatured;

      const queryString = new URLSearchParams(filters as Record<string, string>).toString();
      const response = await axiosInstance.get(`/restaurants/${restaurantId}/menu/filter?${queryString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItemsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItemsThunk.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.loading = false;
        state.menuItems = action.payload;
      })
      .addCase(fetchMenuItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default menuItemsSlice.reducer;
