import mongoose, { Schema, Document } from 'mongoose';

// Define the Offer model interface
interface IOffer extends Document {
  title: string;                     // Title of the offer
  description: string;               // A description of the offer
  banner: string;               // A description of the offer
  discountPercentage: number;        // Discount percentage or value
  offerType: string;                 // Type of offer (restaurant-wide, menu item, etc.)
  validityStart: Date;               // Start date for offer validity
  validityEnd: Date;                 // End date for offer validity
  eligibleServices: string[];        // Dine-In, Takeaway, Delivery, etc.
  minimumOrderValue: number;         // Minimum order value required for offer (if any)
  isActive: boolean;                 // Whether the offer is active or not
  isTodaySpecial: boolean;                 // Whether the offer is active or not
  restaurant: mongoose.Types.ObjectId; // Reference to the restaurant offering the discount
  menuItems?: mongoose.Types.ObjectId[]; // Optional: Specific menu items linked to the offer
  media?: mongoose.Types.ObjectId[]; // Optional: Specific menu items linked to the offer
  createdBy: mongoose.Types.ObjectId;  // User or Admin who created the offer
  status: string;                   // Offer status: 'Active', 'Expired', 'Pending'
  createdAt: Date;
  updatedAt: Date;
}

// Offer Schema
const offerSchema = new Schema<IOffer>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    banner: { type: String, trim: true },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    offerType: {
      type: String,
      enum: ['Restaurant', 'Menu Item', 'Dine-In', 'Takeaway', 'Delivery'],
      required: true,
    },
    validityStart: { type: Date, required: true },
    validityEnd: { type: Date, required: true },
    eligibleServices: {
      type: [String],
      enum: ['Dine-In', 'Takeaway', 'Delivery'],
      required: true,
    },
    minimumOrderValue: { type: Number, default: 0 }, // Optional: For minimum order
    isActive: { type: Boolean, default: true },      // Offer is active or expired
    isTodaySpecial: { type: Boolean, default: true },      // Offer is active or expired
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }], // Optional: Specific menu items
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }], // Optional: Specific menu items
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User or Admin who created the offer
    status: {
      type: String,
      enum: ['Active', 'Expired', 'Pending'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

// Create and export the Offer model
const Offer = mongoose.model<IOffer>('Offer', offerSchema);
export default Offer;
