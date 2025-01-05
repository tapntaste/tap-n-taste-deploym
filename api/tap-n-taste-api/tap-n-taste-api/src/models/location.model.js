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
var location_model_exports = {};
__export(location_model_exports, {
  default: () => location_model_default
});
module.exports = __toCommonJS(location_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const locationSchema = new import_mongoose.default.Schema(
  {
    placeName: {
      type: String,
      required: true,
      trim: true
    },
    // Name of the location (e.g., "Restaurant Name")
    longitude: {
      type: Number,
      required: true
    },
    // Longitude of the location
    latitude: {
      type: Number,
      required: true
    },
    // Latitude of the location
    street: {
      type: String,
      required: true,
      trim: true
    },
    // Street address
    city: {
      type: String,
      required: true,
      trim: true
    },
    // City name
    state: {
      type: String,
      required: true,
      trim: true
    },
    // State or region name
    country: {
      type: String,
      required: true,
      trim: true
    },
    // Country name
    countryCode: {
      type: String,
      required: true,
      trim: true
    },
    // Country code (e.g., 'US', 'IN', 'UK')
    zipCode: {
      type: String,
      trim: true
    },
    // ZIP code or postal code
    region: {
      type: String,
      trim: true
    },
    // Region like a county or province
    timeZone: {
      type: String,
      default: "UTC"
    },
    // Time zone of the location
    formattedAddress: {
      type: String,
      trim: true
    },
    // Full formatted address as a string
    locationType: {
      type: String,
      enum: ["restaurant", "office", "warehouse", "other"],
      default: "restaurant"
    },
    // Type of location (e.g., restaurant, office, etc.)
    isPrimary: {
      type: Boolean,
      default: false
    },
    // Flag for marking primary location (e.g., main branch)
    isActive: {
      type: Boolean,
      default: true
    },
    // Flag to indicate if location is active
    geoCoordinates: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      },
      required: true
    },
    // Storing coordinates in a nested object for more clarity
    // References to related collections
    restaurantId: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    // Associated restaurant
    createdBy: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // User who created this location
    updatedBy: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User"
    }
    // User who last updated this location
  },
  { timestamps: true }
);
const Location = import_mongoose.default.model("Location", locationSchema);
var location_model_default = Location;
