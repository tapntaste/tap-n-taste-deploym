import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './restaurantSlice'; // Adjust path as necessary

// Configure the store
export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
  },
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
