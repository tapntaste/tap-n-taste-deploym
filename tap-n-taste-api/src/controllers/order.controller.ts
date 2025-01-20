import { Request, Response } from 'express';
import Order from '../models/order.model';
import Restaurant from '../models/restaurant.model';
import Menu from '../models/menu.model';
import Table from '../models/table.model';

// Create a new order
// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user.id; // Assuming user is authenticated and `req.user` exists
//     const { restaurantId, items, totalPrice, tableId, cookingRequest } = req.body;

//     const newOrder = await Order.create({
//       userId,
//       restaurantId,
//       items,
//       totalPrice,
//       tableId,
//       cookingRequest,
//     });

//     return res.status(201).json({ success: true, data: newOrder });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     return res.status(500).json({ success: false, message: 'Failed to create order', error });
//   }
// };



export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Assuming user is authenticated
    const { restaurantId, items, tableId, cookingRequest, ...otherDetails } = req.body;

    // Validate the restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    // Validate the menu items
    const menuItemIds = items.map((item: { menuId: string }) => item.menuId);

    const validMenuItems = await Menu.find({
      _id: { $in: menuItemIds },
      restaurant: restaurantId, // Ensure menu items belong to the given restaurant
    });

    if (validMenuItems.length !== items.length) {
      return res.status(400).json({
        success: false,
        message: 'Some menu items do not belong to the specified restaurant',
        invalidItems: menuItemIds.filter(
          (id) => !validMenuItems.some((menuItem) => menuItem._id.toString() === id)
        ),
      });
    }

     // Calculate the total price of menu items
     let itemTotal = 0;
     items.forEach((item: { menuId: string; quantity: number }) => {
       const menuItem = validMenuItems.find((menu) => menu._id.toString() === item.menuId);
       if (menuItem) {
         itemTotal += menuItem.price * item.quantity; // Multiply price by quantity
       }
     });
 
     // Calculate taxes
     let totalTax = 0;
     restaurant.tax.forEach((tax: { value: number; feeType: string; isActive: boolean }) => {
       if (tax.isActive) {
         if (tax.feeType === 'Percentage') {
           totalTax += (itemTotal * tax.value) / 100; // Percentage-based tax
         } else if (tax.feeType === 'Fixed') {
           totalTax += tax.value; // Fixed fee
         }
       }
     });
 
     // Final total price
     const totalPrice = itemTotal + totalTax;

     

    // Validate the table (optional field)
    if (tableId) {
      const table = await Table.findOne({ _id: tableId, restaurant: restaurantId });
      if (!table) {
        return res.status(400).json({
          success: false,
          message: 'The specified table does not belong to the restaurant',
        });
      }
    }



    // Create the order
    const newOrder = await Order.create({
      userId,
      restaurantId,
      items,
      totalPrice,
      tableId,
      cookingRequest,
      ...otherDetails,
    });

    return res.status(200).json({ success: true, data: newOrder,message:"Order created successfully" });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ success: false, message: 'Failed to create order', error });
  }
};


// Fetch orders for the logged-in user
export const fetchUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Get userId from authenticated user

    const orders = await Order.find({ userId })
      .populate('items.menuId')
      .populate('restaurantId')
      .populate('userId');

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch user orders', error });
  }
};
export const fetchOrderId = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id; // Get userId from authenticated user

    const orders = await Order.findById(orderId)

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch user orders by id', error });
  }
};

// Fetch orders by restaurant ID
export const fetchOrdersByRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: 'Restaurant ID is required' });
    }

    const orders = await Order.find({ restaurantId })
      .populate('items.menuId')
      .populate('restaurantId')
      .populate('userId');

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching restaurant orders:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch restaurant orders', error });
  }
};


export const updateOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Assuming user is authenticated and `req.user` exists
    const { id } = req.params; // Order ID
    const { restaurantId, items, totalPrice, tableId, cookingRequest, ...otherUpdates } = req.body;

    // Fetch the order to ensure it exists and belongs to the user
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if the restaurant exists
    if (restaurantId) {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
    }

    // Validate that all menu items belong to the specified restaurant (if items are being updated)
    if (items) {
      const menuItemIds = items.map((item: { menuId: string }) => item.menuId);
      const validMenuItems = await Menu.find({
        _id: { $in: menuItemIds },
        restaurantId: restaurantId || existingOrder.restaurantId, // Use existing restaurantId if not updated
      });

      if (validMenuItems.length !== items.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more menu items do not belong to the specified restaurant',
        });
      }
    }

    // Validate that the table exists and belongs to the restaurant (if tableId is being updated)
    if (tableId) {
      const table = await Table.findOne({
        _id: tableId,
        restaurantId: restaurantId || existingOrder.restaurantId, // Use existing restaurantId if not updated
      });
      if (!table) {
        return res.status(400).json({
          success: false,
          message: 'The specified table does not belong to the restaurant',
        });
      }
    }

    // Update the order with validated data
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        restaurantId,
        items,
        totalPrice,
        tableId,
        cookingRequest,
        ...otherUpdates, // Include any other fields being updated
      },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found after update' });
    }

    return res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ success: false, message: 'Failed to update order', error });
  }
};


// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Order ID

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    return res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete order', error });
  }
};
