var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// tap-n-taste-api/src/main.ts
var main_exports = {};
__export(main_exports, {
  io: () => io
});
module.exports = __toCommonJS(main_exports);
var import_express6 = __toESM(require("express"));

// tap-n-taste-api/src/config/database.ts
var import_mongoose = __toESM(require("mongoose"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var connectDB = async () => {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("DATABASE_URL is not defined in the environment variables.");
    process.exit(1);
  }
  try {
    await import_mongoose.default.connect(DATABASE_URL, {
      dbName: "tap-n-taste-unfetch-ai"
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
var database_default = connectDB;

// tap-n-taste-api/src/routes/restaurant.routes.ts
var import_express4 = __toESM(require("express"));

// tap-n-taste-api/src/middlewares/auth.middleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
var authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
var authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || typeof req.user === "string" || !roles.includes(req.user["role"])) {
        return res.status(403).json({ error: "Access denied. You do not have the required permissions." });
      }
      next();
    } catch (error) {
      return res.status(403).json({ error: "Authorization failed." });
    }
  };
};

// tap-n-taste-api/src/models/restaurant.model.ts
var import_mongoose2 = __toESM(require("mongoose"));
var restaurantSchema = new import_mongoose2.default.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    location: { type: import_mongoose2.default.Schema.Types.ObjectId, ref: "Location", required: true },
    contact: { type: import_mongoose2.default.Schema.Types.ObjectId, ref: "Contact", required: true },
    tagline: { type: String },
    description: { type: String, maxlength: 1e3 },
    openHours: { type: import_mongoose2.default.Schema.Types.ObjectId, ref: "OpenHours", required: true },
    status: {
      type: String,
      enum: ["Open", "Closed", "Temporarily Closed"],
      default: "Open"
    },
    distance: { type: Number },
    cuisine: { type: [String], required: true },
    features: { type: [String] },
    facilities: { type: [String] },
    categories: { type: [String] },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    offers: { type: [String] },
    media: { type: import_mongoose2.default.Schema.Types.ObjectId, ref: "Media" },
    socialLinks: { type: import_mongoose2.default.Schema.Types.ObjectId, ref: "SocialLinks" },
    recommendations: { type: import_mongoose2.default.Schema.Types.ObjectId, ref: "Recommendations" },
    reviews: [{ type: import_mongoose2.default.Schema.Types.ObjectId, ref: "Review" }],
    events: [{ type: import_mongoose2.default.Schema.Types.ObjectId, ref: "Event" }],
    faq: [{ type: import_mongoose2.default.Schema.Types.ObjectId, ref: "FAQ" }]
  },
  { timestamps: true }
);
var Restaurant = import_mongoose2.default.model("Restaurant", restaurantSchema);
var restaurant_model_default = Restaurant;

// tap-n-taste-api/src/controllers/restaurant.controller.ts
var createRestaurant = async (req, res, next) => {
  try {
    const newRestaurant = new restaurant_model_default(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    next(error);
  }
};
var getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await restaurant_model_default.find();
    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};
var getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await restaurant_model_default.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};
var updateRestaurant = async (req, res, next) => {
  try {
    const updatedRestaurant = await restaurant_model_default.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedRestaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    next(error);
  }
};
var deleteRestaurant = async (req, res, next) => {
  try {
    const deletedRestaurant = await restaurant_model_default.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// tap-n-taste-api/src/routes/menu.routes.ts
var import_express = __toESM(require("express"));

// tap-n-taste-api/src/models/menu.model.ts
var import_mongoose3 = __toESM(require("mongoose"));
var menuItemSchema = new import_mongoose3.default.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    // e.g., Starter, Main Course, Dessert
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number, min: 1, required: true },
    // Time in minutes
    // Ratings and Reviews
    ratings: {
      averageRating: { type: Number, default: 0, min: 0, max: 5 },
      totalRatings: { type: Number, default: 0 },
      reviews: [
        {
          user: {
            type: import_mongoose3.default.Schema.Types.ObjectId,
            ref: "User",
            required: true
          },
          reviewText: { type: String, trim: true },
          rating: { type: Number, min: 1, max: 5, required: true },
          photos: [{ type: String, trim: true }],
          // Optional review photos
          createdAt: { type: Date, default: Date.now }
        }
      ]
    },
    // Tags for dietary preferences and sorting
    tags: [
      {
        type: String,
        // e.g., Vegan, Gluten-Free, Spicy, Keto, Organic
        trim: true
      }
    ],
    // Filters and sorting options
    spiceLevel: {
      type: String,
      enum: ["Mild", "Medium", "Spicy", "Extra Spicy"],
      // Predefined spice levels
      default: "Mild"
    },
    allergens: [
      {
        type: String,
        // e.g., Nuts, Dairy, Gluten, Shellfish, etc.
        trim: true
      }
    ],
    calories: { type: Number, min: 0 },
    // Calorie count per serving
    popularity: { type: Number, default: 0 },
    // Used for sorting by popularity
    // Customization options
    customizations: [
      {
        name: { type: String, trim: true, required: true },
        // e.g., "Extra Cheese", "Add Fries"
        price: { type: Number, min: 0, default: 0 },
        isAvailable: { type: Boolean, default: true }
      }
    ],
    services: {
      dineIn: { type: Boolean, default: true },
      delivery: { type: Boolean, default: true },
      takeOut: { type: Boolean, default: true },
      eventBooking: { type: Boolean, default: false },
      tableBooking: { type: Boolean, default: true }
    },
    facilities: {
      wifi: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      wheelchairAccessible: { type: Boolean, default: false },
      kidsPlayArea: { type: Boolean, default: false }
    },
    ambiance: [{ type: String }],
    // e.g., "Romantic, Family-friendly, Casual"
    openHoursByService: {
      dineIn: { start: { type: String }, end: { type: String } },
      delivery: { start: { type: String }, end: { type: String } },
      takeOut: { start: { type: String }, end: { type: String } }
    },
    feedback: [
      {
        user: { type: import_mongoose3.default.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, trim: true },
        photo: { type: String },
        // Optional photo of the dish by the user
        video: { type: String },
        // Optional video link of the dish by the user
        createdAt: { type: Date, default: Date.now }
      }
    ],
    ratingsBreakdown: {
      fiveStars: { type: Number, default: 0 },
      fourStars: { type: Number, default: 0 },
      threeStars: { type: Number, default: 0 },
      twoStars: { type: Number, default: 0 },
      oneStar: { type: Number, default: 0 }
    },
    ingredients: [
      {
        name: { type: String, trim: true, required: true },
        // e.g., "Tomatoes"
        isOrganic: { type: Boolean, default: false },
        // Organic or not
        isLocallySourced: { type: Boolean, default: false }
        // Locally sourced or not
      }
    ],
    source: {
      farm: { type: String, trim: true },
      // e.g., "Fresh Farms"
      location: { type: String, trim: true }
      // e.g., "California, USA"
    },
    inStock: { type: Boolean, default: true },
    estimatedCookingTime: { type: Number, required: true, min: 0 },
    // Time in minutes
    popularityScore: { type: Number, default: 0 },
    // Derived from sales or ratings
    discountPercentage: { type: Number, min: 0, max: 100 },
    isOnPromotion: { type: Boolean, default: false },
    threeDView: {
      modelUrl: { type: String, trim: true },
      // URL to 3D model file (e.g., .glb, .usdz)
      previewImage: { type: String, trim: true },
      // Thumbnail or preview image for the AR model
      threedTags: [{ type: String, trim: true }]
      // AR-specific tags like "360-view", "interactive"
    },
    // 3D file URL or link
    dynamicPricing: [
      {
        startTime: { type: String },
        // e.g., "16:00"
        endTime: { type: String },
        // e.g., "18:00"
        discountPercentage: { type: Number, min: 0, max: 100 }
      }
    ],
    availableDays: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ]
      }
    ],
    costPrice: { type: Number, min: 0 },
    salesCount: { type: Number, default: 0 },
    frequentlyBoughtTogether: [
      { type: import_mongoose3.default.Schema.Types.ObjectId, ref: "MenuItem" }
    ],
    customerPreferences: {
      isFavorite: { type: Boolean, default: false },
      // For marking items as a favorite
      lastOrdered: { type: Date }
      // For analytics
    },
    promotions: [
      {
        title: { type: String, trim: true },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        discountPercentage: { type: Number, min: 0, max: 100 }
      }
    ],
    deliveryRadius: { type: Number, default: 5 },
    // Radius in kilometers
    dietaryPreferences: {
      isVegan: { type: Boolean, default: false },
      isVegetarian: { type: Boolean, default: false },
      isGlutenFree: { type: Boolean, default: false }
    },
    comboOptions: [
      {
        comboName: { type: String, trim: true },
        // e.g., "Burger + Fries + Drink"
        price: { type: Number, required: true },
        itemsIncluded: [
          { type: import_mongoose3.default.Schema.Types.ObjectId, ref: "MenuItem" }
        ]
        // References to other menu items
      }
    ],
    // Images and Videos
    images: [
      {
        url: { type: String, trim: true },
        altText: { type: String, trim: true }
      }
    ],
    videos: [
      {
        url: { type: String, trim: true },
        altText: { type: String, trim: true }
      }
    ],
    // AR and 3D View
    arView: {
      modelUrl: { type: String, trim: true },
      // URL to 3D model file (e.g., .glb, .usdz)
      previewImage: { type: String, trim: true },
      // Thumbnail or preview image for the AR model
      arTags: [{ type: String, trim: true }]
      // AR-specific tags like "360-view", "interactive"
    },
    // Food classification for sorting/filtering
    isChefSpecial: { type: Boolean, default: false },
    isMostLiked: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    // For highlighting items
    isVeg: { type: Boolean, default: false },
    // true = vegetarian, false = non-vegetarian
    isHalal: { type: Boolean, default: false },
    // true = halal certified
    // Relationships
    restaurant: {
      type: import_mongoose3.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    createdByUser: {
      type: import_mongoose3.default.Schema.Types.ObjectId,
      ref: "User"
      // If created by a customer
    },
    createdByAdmin: {
      type: import_mongoose3.default.Schema.Types.ObjectId,
      ref: "Admin"
      // If created by an admin
    },
    updatedBy: {
      type: import_mongoose3.default.Schema.Types.ObjectId,
      ref: "User"
      // Could be a user or admin who updated it
    }
  },
  { timestamps: true }
);
var MenuItem = import_mongoose3.default.model("MenuItem", menuItemSchema);
var menu_model_default = MenuItem;

// tap-n-taste-api/src/controllers/menu.controller.ts
var createMenuItem = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { name, price, category, createdBy } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ error: "Required fields are missing" });
    }
    const restaurant = await restaurant_model_default.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    const menuItem = new menu_model_default({ ...req.body, restaurant: restaurantId });
    const savedMenuItem = await menuItem.save();
    res.status(201).json({ message: "Menu item created successfully", data: savedMenuItem });
  } catch (error) {
    res.status(500).json({ error: "Error creating menu item", details: error.message });
  }
};
var getAllMenuItemsForRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await restaurant_model_default.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    const menuItems = await menu_model_default.find({ restaurant: restaurantId });
    res.status(200).json({ data: menuItems });
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu items", details: error.message });
  }
};
var getMenuItemById = async (req, res) => {
  try {
    const { id: restaurantId, menuId } = req.params;
    const menuItem = await menu_model_default.findOne({ _id: menuId, restaurant: restaurantId });
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.status(200).json({ data: menuItem });
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu item", details: error.message });
  }
};
var updateMenuItem = async (req, res) => {
  try {
    const { id: restaurantId, menuId } = req.params;
    const updatedMenuItem = await menu_model_default.findOneAndUpdate(
      { _id: menuId, restaurant: restaurantId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item updated successfully", data: updatedMenuItem });
  } catch (error) {
    res.status(500).json({ error: "Error updating menu item", details: error.message });
  }
};
var deleteMenuItem = async (req, res) => {
  try {
    const { id: restaurantId, menuId } = req.params;
    const deletedMenuItem = await menu_model_default.findOneAndDelete({ _id: menuId, restaurant: restaurantId });
    if (!deletedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting menu item", details: error.message });
  }
};

// tap-n-taste-api/src/routes/menu.routes.ts
var menuRoutes = import_express.default.Router({ mergeParams: true });
menuRoutes.post("/", authenticate, authorize("Admin", "SuperAdmin"), createMenuItem);
menuRoutes.get("/", getAllMenuItemsForRestaurant);
menuRoutes.get("/:menuId", getMenuItemById);
menuRoutes.put("/:menuId", authenticate, authorize("Admin", "SuperAdmin"), updateMenuItem);
menuRoutes.delete("/:menuId", authenticate, authorize("Admin", "SuperAdmin"), deleteMenuItem);
var menu_routes_default = menuRoutes;

// tap-n-taste-api/src/routes/review.routes.ts
var import_express2 = __toESM(require("express"));

// tap-n-taste-api/src/models/review.model.ts
var import_mongoose4 = __toESM(require("mongoose"));
var reviewSchema = new import_mongoose4.default.Schema({
  // Link to the User who created the review
  user: {
    type: import_mongoose4.default.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // Link to the Restaurant to which the review belongs
  restaurant: {
    type: import_mongoose4.default.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  // User details (Optional but included for context)
  userDetails: {
    name: { type: String, required: true },
    profileImage: { type: String },
    role: { type: String, enum: ["User", "Admin", "SuperAdmin"], default: "User" },
    phone: { type: String }
  },
  // Review content
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true
  },
  // Media attached to the review (e.g., images or videos)
  media: {
    type: [String],
    default: []
  },
  // Timestamps for creation and last update
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
}, { timestamps: true });
var Review = import_mongoose4.default.model("Review", reviewSchema);
var review_model_default = Review;

// tap-n-taste-api/src/controllers/review.controller.ts
var createReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review, images } = req.body;
    const userId = req.user.id;
    const restaurantExists = await restaurant_model_default.findById(id);
    if (!restaurantExists) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    const newReview = await review_model_default.create({
      restaurant: id,
      user: userId,
      rating,
      review,
      images
    });
    res.status(201).json({
      message: "Review created successfully.",
      review: newReview
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create review.",
      details: error.message
    });
  }
};
var getAllReviewsForRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await review_model_default.find({ restaurant: id }).populate("user", "name email").sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch reviews.",
      details: error.message
    });
  }
};
var getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await review_model_default.findById(reviewId).populate("user", "name email");
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch review.",
      details: error.message
    });
  }
};
var updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, review, images } = req.body;
    const userId = req.user.id;
    const updatedReview = await review_model_default.findOneAndUpdate(
      { _id: reviewId, user: userId },
      // Only review owner can update
      { rating, review, images },
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found or unauthorized." });
    }
    res.status(200).json({
      message: "Review updated successfully.",
      review: updatedReview
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update review.",
      details: error.message
    });
  }
};
var deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const deletedReview = await review_model_default.findOneAndDelete({
      _id: reviewId,
      user: userId
      // Ensure only review owner can delete
    });
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found or unauthorized." });
    }
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete review.",
      details: error.message
    });
  }
};

// tap-n-taste-api/src/routes/review.routes.ts
var reviewRoutes = import_express2.default.Router({ mergeParams: true });
reviewRoutes.get("/", getAllReviewsForRestaurant);
reviewRoutes.get("/:reviewId", getReviewById);
reviewRoutes.post("/", authenticate, createReview);
reviewRoutes.put("/:reviewId", authenticate, updateReview);
reviewRoutes.delete("/:reviewId", authenticate, deleteReview);
var review_routes_default = reviewRoutes;

// tap-n-taste-api/src/routes/order.routes.ts
var import_express3 = __toESM(require("express"));

// tap-n-taste-api/src/models/order.model.ts
var import_mongoose5 = __toESM(require("mongoose"));
var orderSchema = new import_mongoose5.default.Schema(
  {
    user: { type: import_mongoose5.default.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: import_mongoose5.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    items: [
      {
        menuItem: {
          type: import_mongoose5.default.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
      }
    ],
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },
    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Confirmed",
        "In Preparation",
        "Ready for Pickup",
        "Out for Delivery",
        "Completed",
        "Cancelled"
      ],
      default: "Placed"
    },
    customerNote: { type: String },
    adminNote: { type: String },
    deliveryAddress: {
      street: { type: String },
      city: { type: String },
      zipCode: { type: String },
      country: { type: String }
    },
    deliveryMethod: { type: String, enum: ["Pickup", "Delivery"], default: "Delivery" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
var Order = import_mongoose5.default.model("Order", orderSchema);
var order_model_default = Order;

// tap-n-taste-api/src/controllers/order.controller.ts
var createOrder = async (req, res) => {
  try {
    const order = await order_model_default.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const order = await order_model_default.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    if (!order)
      return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// tap-n-taste-api/src/routes/order.routes.ts
var orderRoutes = import_express3.default.Router();
orderRoutes.post("/", createOrder);
orderRoutes.patch("/:orderId/status", updateOrderStatus);
var order_routes_default = orderRoutes;

// tap-n-taste-api/src/routes/restaurant.routes.ts
var restaurantRoutes = import_express4.default.Router();
restaurantRoutes.use("/:id/menu", menu_routes_default);
restaurantRoutes.use("/:id/orders", order_routes_default);
restaurantRoutes.use("/:id/reviews", review_routes_default);
restaurantRoutes.post("/", authenticate, authorize("SuperAdmin"), createRestaurant);
restaurantRoutes.put("/:id", authenticate, authorize("SuperAdmin"), updateRestaurant);
restaurantRoutes.delete("/:id", authenticate, authorize("SuperAdmin"), deleteRestaurant);
restaurantRoutes.get("/", getRestaurants);
restaurantRoutes.get("/:id", getRestaurantById);
var restaurant_routes_default = restaurantRoutes;

// tap-n-taste-api/src/routes/auth.routes.ts
var import_express5 = __toESM(require("express"));

// tap-n-taste-api/src/controllers/auth.controller.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_passport = __toESM(require("passport"));

// tap-n-taste-api/src/models/user.model.ts
var import_mongoose6 = __toESM(require("mongoose"));
var import_bcrypt = __toESM(require("bcrypt"));
var userSchema = new import_mongoose6.default.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true, default: null },
    password: { type: String, required: true },
    otp: { type: String },
    profileImage: { type: String },
    otpExpiry: { type: Date },
    phone: { type: String, unique: true, default: null },
    restaurantId: { type: import_mongoose6.default.Schema.Types.ObjectId, ref: "Restaurant" },
    // Only for Admin
    role: {
      type: String,
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User"
    },
    status: { type: String, enum: ["pending", "verified"], default: "pending" },
    accessToken: { type: String },
    refreshToken: { type: String },
    GAccessToken: { type: String },
    GRefreshToken: { type: String },
    // New fields
    lastLogin: { type: Date },
    preferences: {
      language: { type: String, default: "English" },
      currency: { type: String, default: "USD" },
      notificationsEnabled: { type: Boolean, default: true },
      dietaryPreferences: {
        type: [String],
        default: []
        // e.g., Vegan, Gluten-Free, Dairy-Free
      },
      favoriteCuisine: { type: String, default: null }
      // e.g., Italian, Chinese, etc.
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      country: { type: String, trim: true }
    },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    socialLinks: { type: import_mongoose6.default.Schema.Types.ObjectId, ref: "SocialLinks" },
    // Reference to SocialLinks schema
    referralCode: { type: String },
    referredBy: { type: import_mongoose6.default.Schema.Types.ObjectId, ref: "User" },
    isVerified: { type: Boolean, default: false },
    twoFactorAuthEnabled: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
    isBlocked: { type: Boolean, default: false },
    // Blocked users cannot log in
    favoriteRestaurants: [{
      type: import_mongoose6.default.Schema.Types.ObjectId,
      ref: "Restaurant"
    }],
    // List of restaurants the user prefers
    orderHistory: [{
      type: import_mongoose6.default.Schema.Types.ObjectId,
      ref: "Order"
    }]
    // List of past orders by the user
  },
  { timestamps: true }
);
userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await import_bcrypt.default.hash(this.password, 10);
  }
  next();
});
userSchema.methods.comparePassword = async function(candidatePassword) {
  return import_bcrypt.default.compare(candidatePassword, this.password);
};
var User = import_mongoose6.default.model("User", userSchema);
var user_model_default = User;

// tap-n-taste-api/src/controllers/auth.controller.ts
var import_uuid = require("uuid");

// tap-n-taste-api/src/constant/route.constant.ts
var T_SCANNING_FRONTEND_URL = process.env.T_SCANNING_FRONTEND_URL;
var T_ADMIN_FRONTEND_URL = process.env.T_ADMIN_FRONTEND_URL;

// tap-n-taste-api/src/controllers/auth.controller.ts
var OTP_EXPIRY = 5 * 60 * 1e3;
var JWT_SECRET2 = process.env.JWT_SECRET || "your_jwt_secret";
var JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
var googleAuthCallback = (req, res) => {
  import_passport.default.authenticate("google", { session: false }, async (err, user) => {
    console.log("Error:", err);
    console.log("User:", user);
    if (err || !user) {
      return res.status(401).json({ message: "Google authentication failed" });
    }
    try {
      let existingUser = await user_model_default.findOne({ email: user.email });
      if (!existingUser) {
        existingUser = new user_model_default({
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          password: user.password,
          phone: user.email,
          profileImage: user.profileImage,
          GAccessToken: user.GAccessToken,
          GRefreshToken: user.GRefreshToken
        });
        await existingUser.save();
      }
      const token = import_jsonwebtoken2.default.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
          role: existingUser.role
        },
        JWT_SECRET2,
        { expiresIn: JWT_EXPIRY }
      );
      res.cookie("token", token, {
        httpOnly: true,
        // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production",
        // Send only over HTTPS in production
        sameSite: "none"
        // Mitigate CSRF attacks
      });
      const providedRestaurantId = req.query.restaurantId;
      let restaurantId;
      if (existingUser.role === "Admin") {
        restaurantId = existingUser.restaurantId;
      } else if (existingUser.role === "User") {
        restaurantId = providedRestaurantId || existingUser.restaurantId || "1";
      }
      let redirectUrl = "";
      if (existingUser.role === "User") {
        redirectUrl = `${T_SCANNING_FRONTEND_URL}/restaurant/${restaurantId}/user/${existingUser.id}/`;
      } else if (existingUser.role === "Admin") {
        redirectUrl = `${T_ADMIN_FRONTEND_URL}/restaurant/${restaurantId}/admin/${existingUser.id}/`;
      }
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("Error during callback processing:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })(req, res);
};
var signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !password || !email && !phone) {
      return res.status(400).json({
        message: "Name, password, and either email or phone are required"
      });
    }
    const query = {};
    if (email)
      query.email = email;
    if (phone)
      query.phone = phone;
    const existingUser = await user_model_default.findOne({ email });
    const existingUserPhone = await user_model_default.findOne({ phone });
    if (existingUser || existingUserPhone) {
      return res.status(400).json({
        message: "Email or Phone already registered",
        user: existingUser || existingUserPhone
      });
    }
    const user = new user_model_default({
      name,
      email: email || phone || (0, import_uuid.v4)(),
      // Set to null if not provided
      phone: phone || email || (0, import_uuid.v4)(),
      // Set to null if not provided
      password,
      role: "User",
      // Default role
      status: "verified"
      // Directly set status as verified for signup
    });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};
var login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if (!password || !email && !phone) {
      return res.status(400).json({ message: "Password and either email or phone are required" });
    }
    const query = {};
    if (email)
      query.email = email;
    if (phone)
      query.phone = phone;
    const user = await user_model_default.findOne({
      $or: Object.keys(query).map((key) => ({ [key]: query[key] }))
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.role === "Admin" && user.status !== "verified") {
      return res.status(401).json({ message: "Admin account pending approval" });
    }
    const token = import_jsonwebtoken2.default.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET2,
      { expiresIn: JWT_EXPIRY }
    );
    res.setHeader("token", token).status(200).cookie("token", token, {
      httpOnly: true,
      // Prevents client-side JS from accessing the cookie
      secure: true,
      // Send only over HTTPS in production
      sameSite: "none"
      // For cross-origin requests, SameSite must be 'None'
    }).json({
      token,
      user,
      message: "Login successful",
      id: user?.id,
      restaurantId: user?.restaurantId,
      role: user?.role
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
var verifySignupOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await user_model_default.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not found" });
    if (user.status !== "pending") {
      return res.status(400).json({ error: "User is already verified" });
    }
    if (user.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ error: "OTP has expired" });
    }
    user.status = "verified";
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "OTP verification failed" });
  }
};
var sendLoginOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const user = await user_model_default.findOne({ $or: [{ email }, { phone }] });
    if (!user)
      return res.status(404).json({ error: "User not found" });
    const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + OTP_EXPIRY;
    await user.save();
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};
var verifyLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await user_model_default.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });
    if (Date.now() > user.otpExpiry)
      return res.status(400).json({ error: "OTP expired" });
    const token = import_jsonwebtoken2.default.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET2,
      { expiresIn: JWT_EXPIRY }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "OTP verification failed" });
  }
};
var requestAdminSignup = async (req, res) => {
  try {
    const { name, email, password, restaurantId, phone } = req.body;
    const existingUser = await user_model_default.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const admin = new user_model_default({
      name,
      email,
      phone: phone || email,
      password,
      role: "Admin",
      restaurantId,
      status: "pending"
      // Status will be updated once approved
    });
    await admin.save();
    res.status(201).json({
      message: "Admin registration request submitted for approval",
      admin
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Registration request failed", error });
  }
};
var approveAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    if (req.user?.role !== "SuperAdmin") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const admin = await user_model_default.findById(adminId);
    if (!admin || admin.role !== "Admin" || admin.status !== "pending") {
      return res.status(404).json({ error: "Invalid admin request" });
    }
    admin.status = "verified";
    await admin.save();
    res.status(200).json({ message: "Admin approved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Approval failed" });
  }
};

// tap-n-taste-api/src/utils/googleAuth.ts
var import_passport2 = __toESM(require("passport"));
var import_passport_google_oauth20 = require("passport-google-oauth20");
var import_uuid2 = require("uuid");
import_passport2.default.use(
  new import_passport_google_oauth20.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback"
      // updated URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile);
        let user = await user_model_default.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await user_model_default.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "gauthUserPassword",
            role: "User",
            phone: profile.emails[0].value || (0, import_uuid2.v4)(),
            status: profile.emails[0].verified ? "verified" : "pending",
            profileImage: profile.photos[0]?.value,
            GAccessToken: accessToken,
            GRefreshToken: refreshToken
          });
        }
        done(null, user);
      } catch (error) {
        console.error("Error in GoogleStrategy:", error);
        done(error, null);
      }
    }
  )
);
var googleAuth_default = import_passport2.default;

// tap-n-taste-api/src/routes/auth.routes.ts
var router = import_express5.default.Router();
router.post("/signup", signup);
router.post("/signup/verify", verifySignupOTP);
router.post("/login", login);
router.post("/otp/login", sendLoginOTP);
router.post("/otp/login/verify", verifyLoginOTP);
console.log("fasd");
router.get("/google", (req, res, next) => {
  const redirect = req.query.redirect;
  const fullRedirectUrl = `${redirect}`;
  googleAuth_default.authenticate("google", {
    scope: ["profile", "email"],
    state: encodeURIComponent(fullRedirectUrl)
    // Pass redirect path as state
  })(req, res, next);
});
router.get("/google/callback", googleAuthCallback);
router.post("/admin/signup", requestAdminSignup);
router.put("/admin/approve/:adminId", authenticate, authorize("SuperAdmin"), approveAdmin);
var auth_routes_default = router;

// tap-n-taste-api/src/main.ts
var import_dotenv2 = __toESM(require("dotenv"));

// tap-n-taste-api/src/middlewares/errorHandler.ts
var errorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
};
var errorHandler_default = errorHandler;

// tap-n-taste-api/src/middlewares/uploadMiddleware.ts
var import_multer = __toESM(require("multer"));
var import_cloudinary = require("cloudinary");
var import_multer_storage_cloudinary = require("multer-storage-cloudinary");
import_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var storage = new import_multer_storage_cloudinary.CloudinaryStorage({
  cloudinary: import_cloudinary.v2,
  params: async (req, file) => {
    const folder = "uploads";
    const resourceType = file.mimetype.startsWith("video") ? "video" : "image";
    return {
      folder,
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`
    };
  }
});
var upload = (0, import_multer.default)({ storage });
var handleFileUpload = (req, res, next) => {
  const uploadHandler = upload.any();
  uploadHandler(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: "File upload failed", details: err.message });
    }
    if (req.files && Array.isArray(req.files)) {
      const uploadedFiles = req.files.map((file) => ({
        url: file.path,
        // Cloudinary file URL
        originalname: file.originalname
      }));
      req.body.uploadedFiles = uploadedFiles;
    }
    next();
  });
};

// tap-n-taste-api/src/main.ts
var import_http = __toESM(require("http"));
var import_socket = __toESM(require("socket.io"));
var import_cors = __toESM(require("cors"));
import_dotenv2.default.config();
var app = (0, import_express6.default)();
var server = import_http.default.createServer(app);
var io = new import_socket.default.Server(server);
var PORT = process.env.PORT || 3e3;
var corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:4300"],
  // Allow both frontend URLs
  credentials: true
  // Allow cookies to be sent with requests
};
app.use((0, import_cors.default)(corsOptions));
app.use(import_express6.default.json());
database_default();
app.use(import_express6.default.urlencoded({ extended: true }));
app.use(handleFileUpload);
app.use(googleAuth_default.initialize());
app.use("/api/auth", auth_routes_default);
app.use("/api/restaurants", restaurant_routes_default);
app.use(errorHandler_default);
app.get("/health", async (req, res) => {
  const healthReport = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: /* @__PURE__ */ new Date(),
    database: "Unknown",
    memoryUsage: process.memoryUsage()
    // loadAverage: process.loadavg(),
  };
  try {
    const isDatabaseConnected = await checkDatabaseConnection();
    healthReport.database = isDatabaseConnected ? "Connected" : "Disconnected";
  } catch (err) {
    healthReport.database = "Error";
  }
  res.status(200).json(healthReport);
});
app.get("/test", (req, res) => {
  res.status(200).json({ message: "API Test Route is working!" });
});
app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Tap-n-Taste API!" });
});
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
async function checkDatabaseConnection() {
  const mongoose7 = require("mongoose");
  return mongoose7.connection.readyState === 1;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  io
});
//# sourceMappingURL=main.js.map
