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
var media_model_exports = {};
__export(media_model_exports, {
  default: () => media_model_default
});
module.exports = __toCommonJS(media_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const mediaSchema = new import_mongoose.default.Schema(
  {
    restaurantId: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    // Link media to a specific restaurant
    banner: {
      type: String,
      required: true
    },
    // Banner image URL (could be a primary image or feature image)
    gallery: {
      type: [String],
      default: []
    },
    // Gallery of images (array of image URLs)
    videos: {
      type: [String],
      default: []
    },
    // Videos associated with the restaurant (array of video URLs)
    mediaType: {
      type: String,
      enum: ["image", "video", "banner"],
      default: "image"
    },
    // Type of media (image, video, banner)
    mediaDescription: {
      type: String,
      default: ""
    },
    // Optional field to describe the media (e.g., image description)
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active"
    },
    // Media status (active or archived)
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    // Timestamp for when the media was uploaded
    createdBy: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User"
    },
    // User who uploaded the media
    isPrimary: {
      type: Boolean,
      default: false
    },
    // Flag to indicate if the media is primary (e.g., main banner)
    size: {
      type: Number,
      default: 0
    },
    // Media size in bytes (optional for tracking)
    tags: {
      type: [String],
      default: []
    },
    // Tags for categorizing media (e.g., "interior", "food", "events")
    createdAt: {
      type: Date,
      default: Date.now
    },
    // Automatically add created timestamp
    updatedAt: {
      type: Date,
      default: Date.now
    }
    // Timestamp for last update
  },
  { timestamps: true }
  // Adds createdAt and updatedAt fields automatically
);
mediaSchema.index({ restaurantId: 1, status: 1, tags: 1 });
const Media = import_mongoose.default.model("Media", mediaSchema);
var media_model_default = Media;
