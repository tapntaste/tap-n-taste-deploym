import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { addItemToCart, getUserCart, removeItemFromCart } from '../controllers/cart.controller';

const cartRoutes = express.Router({ mergeParams: true });

// Route to get all cart items for a user
cartRoutes.get('/', authenticate, getUserCart);
// Add Menu Item to Cart
cartRoutes.post('/', authenticate, addItemToCart);

// Remove Menu Item from Cart
cartRoutes.delete('/', authenticate, removeItemFromCart);

export default cartRoutes;
