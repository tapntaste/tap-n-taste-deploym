import express from 'express';
import { createOrder, deleteOrder, fetchOrdersByRestaurant, fetchUserOrders, updateOrder,fetchOrderId } from '../controllers/order.controller';

const orderRoutes = express.Router();

// POST route for creating an order
// orderRoutes.post('/', createOrder); // Create a new order
orderRoutes.post('/', createOrder); // Create an order
orderRoutes.get('/user', fetchUserOrders); // Fetch orders for the logged-in user
orderRoutes.get('/restaurant/:restaurantId',fetchOrdersByRestaurant); // Fetch orders by restaurant ID
orderRoutes.get('/:id',  fetchOrderId); // Update an order by ID
orderRoutes.put('/:id',  updateOrder); // Update an order by ID
orderRoutes.delete('/:id',  deleteOrder); // Delete an order by ID

// PATCH route for updating the order status
// orderRoutes.patch('/:orderId/status', updateOrderStatus); // Update order status by order ID

export default orderRoutes;
