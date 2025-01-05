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
var user_model_exports = {};
__export(user_model_exports, {
  default: () => user_model_default
});
module.exports = __toCommonJS(user_model_exports);
var import_mongoose = __toESM(require("mongoose"));
var import_bcrypt = __toESM(require("bcrypt"));
const userSchema = new import_mongoose.default.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true, default: null },
    password: { type: String, required: true },
    otp: { type: String },
    profileImage: { type: String },
    otpExpiry: { type: Date },
    phone: { type: String, unique: true, default: null },
    restaurantId: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "Restaurant" },
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
    socialLinks: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "SocialLinks" },
    // Reference to SocialLinks schema
    referralCode: { type: String },
    referredBy: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "User" },
    isVerified: { type: Boolean, default: false },
    twoFactorAuthEnabled: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
    isBlocked: { type: Boolean, default: false },
    // Blocked users cannot log in
    favoriteRestaurants: [{
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Restaurant"
    }],
    // List of restaurants the user prefers
    orderHistory: [{
      type: import_mongoose.default.Schema.Types.ObjectId,
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
const User = import_mongoose.default.model("User", userSchema);
var user_model_default = User;
