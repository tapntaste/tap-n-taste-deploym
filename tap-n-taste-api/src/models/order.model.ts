import mongoose, { Schema, Document } from 'mongoose';

// Order Item Interface
interface IOrderItem {
  menuId: mongoose.Types.ObjectId; // Reference to the Menu item
  quantity: number; // Quantity of the menu item ordered
}

// Order Document Interface
interface IOrder extends Document {
  restaurantId: mongoose.Types.ObjectId; // Reference to the Restaurant
  userId: mongoose.Types.ObjectId; // Reference to the User placing the order
  chefId?: mongoose.Types.ObjectId; // Reference to the Chef handling the order
  items: IOrderItem[]; // Array of menu items and their quantities
  totalPrice: number; // Total price of the order
  cookingRequest?: string; // Optional special cooking instructions
  tableId?: mongoose.Types.ObjectId; // Reference to the Table
  paymentStatus: string; // Payment status (e.g., Paid, Unpaid)
  orderStatus: string; // Order status (e.g., Pending, Accepted, Cancelled, Completed)
  customerNote?: string; // Notes from the customer
  adminNote?: string; // Notes from the admin
  chef: {
    accepted: boolean; // Whether the chef has accepted the order
    estimatedTime?: number; // Estimated time for order completion (in minutes)
    maxTime?: number; // Maximum time for order completion (in minutes)
    cancelReason?: string; // Reason for cancellation by the chef
    messageToUser?: string; // Message from the chef to the user
    requestToUser?: string; // Chef's request to the user
  };
  createdAt?: Date; // Timestamp of when the order was created
  updatedAt?: Date; // Timestamp of when the order was last updated
}

// Define the Order Schema
const orderSchema = new Schema<IOrder>(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional field for the assigned chef
    items: [
      {
        menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    cookingRequest: { type: String, trim: true },
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Unpaid', 'Refunded'],
      default: 'Unpaid',
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    customerNote: { type: String, trim: true },
    adminNote: { type: String, trim: true },
    chef: {
      accepted: { type: Boolean, default: false },
      estimatedTime: { type: Number }, // in minutes
      maxTime: { type: Number }, // in minutes
      cancelReason: { type: String, trim: true },
      messageToUser: { type: String, trim: true },
      requestToUser: { type: String, trim: true },
    },
  },
  { timestamps: true } // Automatically handle createdAt and updatedAt fields
);

// Create and export the Order model
const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
