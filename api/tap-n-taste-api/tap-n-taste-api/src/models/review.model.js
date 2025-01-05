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
var review_model_exports = {};
__export(review_model_exports, {
  default: () => review_model_default
});
module.exports = __toCommonJS(review_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const reviewSchema = new import_mongoose.default.Schema({
  // Link to the User who created the review
  user: {
    type: import_mongoose.default.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // Link to the Restaurant to which the review belongs
  restaurant: {
    type: import_mongoose.default.Schema.Types.ObjectId,
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
const Review = import_mongoose.default.model("Review", reviewSchema);
var review_model_default = Review;
