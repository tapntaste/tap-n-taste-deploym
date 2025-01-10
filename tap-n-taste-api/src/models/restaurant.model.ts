import mongoose, { Schema, Document } from 'mongoose';

// Define Features Interface
interface Features {
  isOrderOnline?: boolean;
  isReviewActivated?: boolean;
  isBookTable?: boolean;
  isEventBook?: boolean;
  isArMenu?: boolean;
  isMenuAvailable?: boolean;
  isDineInAvailable?: boolean;
  isDeliveryAvailable?: boolean;
  isTakeawayAvailable?: boolean;
  isNonVeg?: boolean;
  isPureVeg?: boolean;
}

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
  features?: Features;
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
}

const FeaturesSchema = new Schema<Features>({
  isOrderOnline: { type: Boolean, default: false },
  isReviewActivated: { type: Boolean, default: false },
  isBookTable: { type: Boolean, default: false },
  isEventBook: { type: Boolean, default: false },
  isArMenu: { type: Boolean, default: false },
  isMenuAvailable: { type: Boolean, default: false },
  isDineInAvailable: { type: Boolean, default: false },
  isDeliveryAvailable: { type: Boolean, default: false },
  isTakeawayAvailable: { type: Boolean, default: false },
  isPureVeg: { type: Boolean, default: false },
  isNonVeg: { type: Boolean, default: false },
});

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
    features: { type: FeaturesSchema, default: () => ({}) },
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
  },
  { timestamps: true }
);

const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
export default Restaurant;
