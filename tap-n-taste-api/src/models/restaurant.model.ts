import mongoose, { Schema, Document } from 'mongoose';

// Restaurant Document Interface
interface IRestaurant extends Document {
  name: string;
  slug?: string;
  location?: mongoose.Types.ObjectId;
  contact?: mongoose.Types.ObjectId[];
  tagline?: string;
  description?: string;
  openHours?: mongoose.Types.ObjectId;
  status?: string;
  distance?: number;
  cuisine?: string[];
  features?: mongoose.Types.ObjectId;
  facilities?: string[];
  categories?: string[];
  table?: string[];
  averageRating?: number;
  totalReviews?: number;
  offers?: string[];
  media?: mongoose.Types.ObjectId;
  socialLinks?: mongoose.Types.ObjectId;
  recommendations?: mongoose.Types.ObjectId;
  reviews?: mongoose.Types.ObjectId[];
  events?: mongoose.Types.ObjectId[];
  faq?: mongoose.Types.ObjectId[];
  menu?: mongoose.Types.ObjectId[];
  tax?:[ {
    name: string; // Name of the tax/service fee (e.g., 'Sales Tax', 'Service Charge')
    value: number; // Value of tax/service fee, either fixed or percentage
    feeType: FeeType; // Type of fee (either 'Fixed' or 'Percentage')
    description?: string; // Optional description for the fee
    isActive: boolean; // Whether this fee is currently active
  }]
}

// Define an enum for the type of fee (either fixed or percentage)
enum FeeType {
  Fixed = 'Fixed', // Fixed price (encum)
  Percentage = 'Percentage', // Percentage of total price
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, lowercase: true, trim: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    contact: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
    tagline: { type: String },
    description: { type: String, maxlength: 1000 },
    openHours: { type: mongoose.Schema.Types.ObjectId, ref: 'OpenHours' },
    status: {
      type: String,
      enum: ['Open', 'Closed', 'Temporarily Closed'],
      default: 'Open',
    },
    distance: { type: Number },
    cuisine: { type: [String] },
    features: { type: mongoose.Schema.Types.ObjectId, ref: 'Feature' },
    facilities: { type: [String] },
    categories: { type: [String] },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
    socialLinks: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialLinks' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    faq: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FAQ' }],
    table: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    tax:[ {
      name: { type: String, required: true }, // Name of the tax or service fee (e.g., 'Sales Tax', 'Service Charge')
      value: {
        type: Schema.Types.Number,
        required: true, // Value of tax/service fee, either fixed amount or percentage
      },
      feeType: {
        type: String,
        enum: [FeeType.Fixed, FeeType.Percentage],
        required: true, // Fee type (either 'Fixed' or 'Percentage')
        default: FeeType.Percentage, // Default value is 'Percentage'
      },
      description: { type: String, trim: true, default: '' }, // Optional description, defaults to empty string
      isActive: { type: Boolean, default: true }, // Whether the fee is active, default is true
    },]
  },
  { timestamps: true }
);

const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
export default Restaurant;
