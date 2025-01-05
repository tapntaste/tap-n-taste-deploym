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
var event_model_exports = {};
__export(event_model_exports, {
  default: () => event_model_default
});
module.exports = __toCommonJS(event_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const eventSchema = new import_mongoose.default.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    // Event name
    location: {
      type: String,
      required: true,
      trim: true
    },
    // Event location
    date: {
      type: Date,
      required: true
    },
    // Event date
    time: {
      type: String,
      required: true
    },
    // Event time
    description: {
      type: String,
      maxlength: 1e3
    },
    // Event description
    price: {
      type: Number,
      default: 0
    },
    // Event price (could be 0 for free events)
    type: {
      type: String,
      enum: ["Upcoming", "Previous"],
      required: true
    },
    // Event type: upcoming or previous
    tags: {
      type: [String]
    },
    // Tags related to the event (e.g., music, workshop, food)
    media: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Media"
    },
    // Associated media for the event (images, videos, etc.)
    restaurant: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Restaurant"
    },
    // Reference to the restaurant hosting the event
    userId: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // User who created the event
    likedBy: [{
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User"
    }],
    // Users who liked the event
    registeredUsers: [{
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User"
    }],
    // Users who have registered for the event
    status: {
      type: String,
      enum: ["active", "archived", "completed"],
      default: "active"
    },
    // Event status (active, archived, or completed)
    attendingCount: {
      type: Number,
      default: 0
    },
    // Number of users attending the event
    comments: [{
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Comment"
    }],
    // User comments about the event
    category: {
      type: String,
      enum: ["Music", "Food", "Workshop", "Conference", "Other"],
      default: "Other"
    },
    // Category of the event
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    // Average rating for the event (out of 5)
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      linkedin: { type: String }
    }
    // Social media links related to the event
  },
  { timestamps: true }
);
const Event = import_mongoose.default.model("Event", eventSchema);
var event_model_default = Event;
