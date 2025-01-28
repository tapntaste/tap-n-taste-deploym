import express from 'express';
import {
  authenticate,
  authorize,
  restrictToRestaurant,
} from '../middlewares/auth.middleware';
import {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurantMedia,
  getAdminRestaurant
} from '../controllers/restaurant.controller';
import menuRoutes from './menu.routes';
import reviewRoutes from './review.routes';
import orderRoutes from './order.routes';
import {
  addItemToCart,
  removeItemFromCart,
} from '../controllers/cart.controller';
import cartRoutes from './cart.routes';
import tableRoutes from './table.routes';
import Restaurant from '../models/restaurant.model';

const restaurantRoutes = express.Router();

restaurantRoutes.use('/:id/menu', menuRoutes);
restaurantRoutes.use('/:id/orders', orderRoutes);
restaurantRoutes.use('/:id/user/:userId/cart', cartRoutes);
restaurantRoutes.use('/reviews', reviewRoutes);
restaurantRoutes.use('/table', authenticate, tableRoutes);
restaurantRoutes.use('/order', authenticate, orderRoutes);

// Create a new restaurant - only SuperAdmin can do this
restaurantRoutes.post(
  '/',
  authenticate,
  authorize('SuperAdmin'),
  createRestaurant
);
restaurantRoutes.post(
  '/:id/updateRestaurantMedia',
  authenticate,
  updateRestaurantMedia
);

// Update a restaurant - only SuperAdmin can do this
restaurantRoutes.put(
  '/:id',
  authenticate,
  authorize('SuperAdmin'),
  updateRestaurant
);

// Delete a restaurant - only SuperAdmin can do this
restaurantRoutes.delete(
  '/:id',
  authenticate,
  authorize('SuperAdmin'),
  deleteRestaurant
);

// Get all restaurants - Public route
restaurantRoutes.get('/', getRestaurants);

// Get a specific restaurant by ID - Public route
restaurantRoutes.get('/:id', getRestaurantById);
restaurantRoutes.get(
  '/admin/manager',
  authenticate,
  authorize('Admin'),
  restrictToRestaurant(),
  getAdminRestaurant
);

restaurantRoutes.get(
  '/secure-dataa/:id',
  authenticate,
  authorize('Admin'),
  restrictToRestaurant(),
  getRestaurants
);

export default restaurantRoutes;
