import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@tap-n-taste/hooks';

interface MenuState {
  menuItems: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menuItems: [],
  loading: false,
  error: null,
};

// Thunk to create a menu item
export const createMenuItemThunk = createAsyncThunk(
  'menu/createMenuItem',
  async (
    { restaurantId, menuItem }: { restaurantId: string; menuItem: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/restaurants/${restaurantId}/menu`,
        menuItem
      );
      return response.data; // Assuming the API returns the created menu item
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenuItemThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createMenuItemThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.menuItems.push(action.payload); // Add the new item to the menu list
        }
      )
      .addCase(createMenuItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default menuSlice.reducer;
