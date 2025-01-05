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
var restaurant_model_exports = {};
__export(restaurant_model_exports, {
  default: () => restaurant_model_default
});
module.exports = __toCommonJS(restaurant_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const restaurantSchema = new import_mongoose.default.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    location: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "Location", required: true },
    contact: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "Contact", required: true },
    tagline: { type: String },
    description: { type: String, maxlength: 1e3 },
    openHours: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "OpenHours", required: true },
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
    media: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "Media" },
    socialLinks: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "SocialLinks" },
    recommendations: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "Recommendations" },
    reviews: [{ type: import_mongoose.default.Schema.Types.ObjectId, ref: "Review" }],
    events: [{ type: import_mongoose.default.Schema.Types.ObjectId, ref: "Event" }],
    faq: [{ type: import_mongoose.default.Schema.Types.ObjectId, ref: "FAQ" }]
  },
  { timestamps: true }
);
const Restaurant = import_mongoose.default.model("Restaurant", restaurantSchema);
var restaurant_model_default = Restaurant;
