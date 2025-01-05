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
var table_model_exports = {};
__export(table_model_exports, {
  default: () => table_model_default
});
module.exports = __toCommonJS(table_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const tableSchema = new import_mongoose.default.Schema({
  name: { type: String, required: true, trim: true },
  // e.g., "Table 1"
  number: { type: Number, required: true, unique: true },
  // e.g., 1
  restaurant: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  // QR Code for menu/digital interaction
  qrCode: { type: String, trim: true },
  // URL or string for QR code
  // Table Features
  capacity: { type: Number, required: true, min: 1 },
  // Number of people it can seat
  isOutdoor: { type: Boolean, default: false },
  // Indoor or outdoor seating
  hasPowerOutlet: { type: Boolean, default: false },
  // Indicates if it has a power outlet for charging
  hasPrivacyPartition: { type: Boolean, default: false },
  // For semi-private or private dining
  isAccessible: { type: Boolean, default: false },
  // Wheelchair accessibility
  // Status and Availability
  isAvailable: { type: Boolean, default: true },
  // Whether the table is currently available
  reservationStatus: {
    type: String,
    enum: ["Reserved", "Occupied", "Available", "Maintenance"],
    default: "Available"
  },
  // Location Details
  location: {
    area: { type: String, trim: true },
    // e.g., "Main Hall", "Rooftop"
    position: { type: String, trim: true },
    // e.g., "Near Window", "Corner"
    floor: { type: Number, default: 1 }
    // Floor number
  },
  // Booking Information
  bookings: [
    {
      user: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "User" },
      bookingTime: { type: Date },
      duration: { type: Number, min: 1 },
      // Duration in minutes
      specialRequests: { type: String, trim: true }
      // e.g., "High Chair", "Birthday Setup"
    }
  ],
  // Additional Features
  ambianceTags: [
    {
      type: String,
      // e.g., "Romantic", "Family-Friendly", "Quiet"
      trim: true
    }
  ],
  lastCleanedAt: { type: Date, default: Date.now },
  // Timestamp for last cleaning
  maintenanceNotes: { type: String, trim: true },
  // Notes for maintenance issues
  // For analytics or dynamic management
  popularityScore: { type: Number, default: 0 },
  // Derived from usage frequency
  preferredUsageTime: [
    {
      startTime: { type: String },
      // e.g., "18:00"
      endTime: { type: String }
      // e.g., "22:00"
    }
  ],
  // Admin and Operational Tracking
  createdBy: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "Admin" }
}, { timestamps: true });
const Table = import_mongoose.default.model("Table", tableSchema);
var table_model_default = Table;
