import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@tap-n-taste/hooks';

interface TableState {
  userTable: any | null;  // Store only the current user's table
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  userTable: null, // Initial state with no table assigned
  loading: false,
  error: null,
};

// Thunk to change a user's table
export const changeTableThunk = createAsyncThunk(
  'tables/changeTable',
  async (
    {
      restaurantId,
      tableId,
    }: {
      restaurantId: string;
      tableId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('restaurants/table/change-table', {
        restaurantId,
        tableId,
      });
      return response.data; // Assuming the new table is returned
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const tableSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeTableThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        changeTableThunk.fulfilled,
        (state, action: PayloadAction<{ currentTable: any; newTable: any }>) => {
          state.loading = false;
          // If the user already has a table, we replace it with the new table
          state.userTable = action.payload.newTable;
        }
      )
      .addCase(changeTableThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tableSlice.reducer;
