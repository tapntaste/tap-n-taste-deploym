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
var recommendations_model_exports = {};
__export(recommendations_model_exports, {
  default: () => recommendations_model_default
});
module.exports = __toCommonJS(recommendations_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const recommendationsSchema = new import_mongoose.default.Schema(
  {
    restaurantId: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    // Reference to the Restaurant that this recommendation belongs to
    chefSpecials: {
      type: [String],
      default: []
    },
    // List of chef specials
    mostLiked: {
      type: [String],
      default: []
    },
    // List of most liked dishes or items
    recommendationType: {
      type: String,
      enum: ["Popular", "Seasonal", "Limited-time", "Featured", "Chef's Special"],
      default: "Popular"
    },
    // Type of recommendation
    createdBy: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User"
    },
    // Reference to the User who created the recommendation (could be an admin or chef)
    isActive: {
      type: Boolean,
      default: true
    },
    // Whether the recommendation is active or not
    validFrom: {
      type: Date
    },
    // Start date for validity (e.g., for seasonal recommendations)
    validTo: {
      type: Date
    },
    // End date for validity
    priority: {
      type: Number,
      default: 1
    },
    // Priority level for the recommendation (higher numbers mean higher priority)
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String, default: "" }
        // URL and optional alt text for recommendation images
      }
    ],
    tags: [
      {
        type: String,
        trim: true
      }
      // Tags for filtering (e.g., "gluten-free", "vegan", "spicy")
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    // Average rating for the recommendation
    feedback: [
      {
        user: {
          type: import_mongoose.default.Schema.Types.ObjectId,
          ref: "User"
        },
        // Reference to the user who gave the feedback
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 5
        },
        // Rating given by the user
        comment: {
          type: String,
          trim: true
        },
        // Optional comment by the user
        createdAt: {
          type: Date,
          default: Date.now
        }
        // Timestamp for feedback
      }
    ],
    updatedBy: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User"
    }
    // Reference to the user who last updated the recommendation
  },
  { timestamps: true }
  // Automatically adds createdAt and updatedAt fields
);
const Recommendations = import_mongoose.default.model("Recommendations", recommendationsSchema);
var recommendations_model_default = Recommendations;
