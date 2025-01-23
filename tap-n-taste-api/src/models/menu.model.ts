import mongoose, { Schema } from 'mongoose';
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
  isWifi?: boolean;
  isParking?: boolean;
  isKidsPlayArea?: boolean;
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
  isWifi: { type: Boolean, default: false },
  isParking: { type: Boolean, default: false },
  isKidsPlayArea: { type: Boolean, default: false },
});
const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true }, // e.g., Starter, Main Course, Dessert
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number, min: 1, required: true }, // Time in minutes

    // Ratings and Reviews
    ratings: {
      averageRating: { type: Number, default: 0, min: 0, max: 5 },
      totalRatings: { type: Number, default: 0 },
      reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    },

    // Tags for dietary preferences and sorting
    tags: [
      {
        type: String, // e.g., Vegan, Gluten-Free, Spicy, Keto, Organic
        trim: true,
      },
    ],

    // Filters and sorting options
    spiceLevel: {
      type: String,
      enum: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'], // Predefined spice levels
      default: 'Mild',
    },
    allergens: [
      {
        type: String, // e.g., Nuts, Dairy, Gluten, Shellfish, etc.
        trim: true,
      },
    ],
    calories: { type: Number, min: 0 }, // Calorie count per serving
    popularity: { type: Number, default: 0 }, // Used for sorting by popularity

    // Customization options
    customizations: [
      {
        name: { type: String, trim: true, required: true }, // e.g., "Extra Cheese", "Add Fries"
        price: { type: Number, min: 0, default: 0 },
        isAvailable: { type: Boolean, default: true },
      },
    ],
    services: {
      dineIn: { type: Boolean, default: true },
      delivery: { type: Boolean, default: true },
      takeOut: { type: Boolean, default: true },
      eventBooking: { type: Boolean, default: false },
      tableBooking: { type: Boolean, default: true },
    },
    features: { type: FeaturesSchema, default: () => ({}) },
    ambiance: [{ type: String }], // e.g., "Romantic, Family-friendly, Casual"
    openHoursByService: {
      dineIn: { start: { type: String }, end: { type: String } },
      delivery: { start: { type: String }, end: { type: String } },
      takeOut: { start: { type: String }, end: { type: String } },
    },
    ratingsBreakdown: {
      fiveStars: { type: Number, default: 0 },
      fourStars: { type: Number, default: 0 },
      threeStars: { type: Number, default: 0 },
      twoStars: { type: Number, default: 0 },
      oneStar: { type: Number, default: 0 },
    },
    ingredients: [
      {
        name: { type: String, trim: true, required: true }, // e.g., "Tomatoes"
        isOrganic: { type: Boolean, default: false }, // Organic or not
        isLocallySourced: { type: Boolean, default: false }, // Locally sourced or not
      },
    ],
    source: {
      farm: { type: String, trim: true }, // e.g., "Fresh Farms"
      location: { type: String, trim: true }, // e.g., "California, USA"
    },
    inStock: { type: Boolean, default: true },
    estimatedCookingTime: { type: Number, required: true, min: 0 }, // Time in minutes
    popularityScore: { type: Number, default: 0 }, // Derived from sales or ratings
    discountPercentage: { type: Number, min: 0, max: 100 },
    isOnPromotion: { type: Boolean, default: false },
    threeDView: {
      modelUrl: { type: String, trim: true }, // URL to 3D model file (e.g., .glb, .usdz)
      previewImage: { type: String, trim: true }, // Thumbnail or preview image for the AR model
      threedTags: [{ type: String, trim: true }], // AR-specific tags like "360-view", "interactive"
    }, // 3D file URL or link
    dynamicPricing: [
      {
        startTime: { type: String }, // e.g., "16:00"
        endTime: { type: String }, // e.g., "18:00"
        discountPercentage: { type: Number, min: 0, max: 100 },
      },
    ],
    availableDays: [
      {
        type: String,
        enum: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
      },
    ],
    costPrice: { type: Number, min: 0 },
    salesCount: { type: Number, default: 0 },
    frequentlyBoughtTogether: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    ],
    customerPreferences: {
      isFavorite: { type: Boolean, default: false }, // For marking items as a favorite
      lastOrdered: { type: Date }, // For analytics
    },

    promotions: [
      {
        title: { type: String, trim: true },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        discountPercentage: { type: Number, min: 0, max: 100 },
      },
    ],
    deliveryRadius: { type: Number, default: 5 }, // Radius in kilometers

    dietaryPreferences: {
      isVegan: { type: Boolean, default: false },
      isVegetarian: { type: Boolean, default: false },
      isGlutenFree: { type: Boolean, default: false },
    },

    comboOptions: [
      {
        comboName: { type: String, trim: true }, // e.g., "Burger + Fries + Drink"
        price: { type: Number, required: true },
        itemsIncluded: [
          { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        ], // References to other menu items
      },
    ],

    // Images and Videos
    images: [
      {
        url: { type: String, trim: true },
        altText: { type: String, trim: true },
      },
    ],
    videos: [
      {
        url: { type: String, trim: true },
        altText: { type: String, trim: true },
      },
    ],

    // AR and 3D View
    arView: {
      modelUrl: { type: String, trim: true }, // URL to 3D model file (e.g., .glb, .usdz)
      previewImage: { type: String, trim: true }, // Thumbnail or preview image for the AR model
      arTags: [{ type: String, trim: true }], // AR-specific tags like "360-view", "interactive"
    },

    // Food classification for sorting/filtering
    isChefSpecial: { type: Boolean, default: false },
    isMostLiked: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false }, // For highlighting items
    isVeg: { type: Boolean, default: false }, // true = vegetarian, false = non-vegetarian

    // Relationships
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // If created by a customer
    },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;
