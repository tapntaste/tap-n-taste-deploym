import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './restaurantSlice'; // Adjust path as necessary
import menuItemsReducer from './menuItemsSlice'
import authReducer from './authSlice';
import cartReducer from './cartSlice';

// Configure the store
export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    menuItems: menuItemsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
