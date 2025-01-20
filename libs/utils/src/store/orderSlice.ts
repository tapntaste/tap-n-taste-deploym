import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@tap-n-taste/hooks';

interface OrderItem {
  menuId: string;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  totalPrice: number;
  tableId?: string;
  cookingRequest?: string;
  [key: string]: any;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// Async thunk to create an order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Partial<Order>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('restaurants/order', orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order.');
    }
  }
);

// Async thunk to fetch all orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/restaurants/orders');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders.');
    }
  }
);

// Fetch orders by user ID
export const fetchOrdersByUserId = createAsyncThunk(
  'orders/fetchOrdersByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/restaurants/order/user`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user orders.');
    }
  }
);

// Fetch orders by restaurant ID
export const fetchOrdersByRestaurantId = createAsyncThunk(
  'orders/fetchOrdersByRestaurantId',
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/restaurants/order/restaurant/${restaurantId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurant orders.');
    }
  }
);

// Async thunk to fetch a specific order by ID
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/restaurants/order/${orderId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order.');
    }
  }
);

// Async thunk to update an order
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (
    { orderId, updates }: { orderId: string; updates: Partial<Order> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/restaurants/order/${orderId}`, updates);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order.');
    }
  }
);

// Async thunk to delete an order
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/restaurants/order/${orderId}`);
      return orderId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete order.');
    }
  }
);

// Async thunk to delete a menu item from an order
export const deleteMenuItemFromOrder = createAsyncThunk(
  'orders/deleteMenuItemFromOrder',
  async (
    { orderId, menuId }: { orderId: string; menuId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/restaurants/order/${orderId}/items/${menuId}/cancel`
      );
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete menu item.');
    }
  }
);


// Order slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersByRestaurantId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByRestaurantId.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByRestaurantId.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex((order) => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMenuItemFromOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteMenuItemFromOrder.fulfilled,
        (
          state,
          action: PayloadAction<{ orderId: string; menuId: string; updatedOrder: Order }>
        ) => {
          state.loading = false;

          const { orderId, menuId, updatedOrder } = action.payload;

          // Update current order if it matches the orderId
          if (state.currentOrder && state.currentOrder._id === orderId) {
            state.currentOrder = updatedOrder;
          }

          // Update the specific order in the orders array
          const index = state.orders.findIndex((order) => order._id === orderId);
          if (index !== -1) {
            state.orders[index] = updatedOrder;
          }
        }
      )
      .addCase(deleteMenuItemFromOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentOrder, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
