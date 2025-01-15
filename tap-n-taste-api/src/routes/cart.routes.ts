import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { addItemToCart, removeItemFromCart } from '../controllers/cart.controller';

const cartRoutes = express.Router({ mergeParams: true });

// Add Menu Item to Cart
cartRoutes.post('/', authenticate, addItemToCart);

// Remove Menu Item from Cart
cartRoutes.delete('/:itemId', authenticate, removeItemFromCart);

export default cartRoutes;
