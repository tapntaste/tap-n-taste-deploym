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
var openTime_model_exports = {};
__export(openTime_model_exports, {
  default: () => openTime_model_default
});
module.exports = __toCommonJS(openTime_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const openHoursSchema = new import_mongoose.default.Schema(
  {
    restaurantId: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    // Reference to the restaurant this open hour schedule belongs to
    days: {
      type: [String],
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    },
    // Days the restaurant is open
    openingTime: {
      type: String,
      required: true,
      match: [/^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i, "Invalid opening time format"]
    },
    // Opening time in 12-hour format (e.g., 9:00 AM)
    closingTime: {
      type: String,
      required: true,
      match: [/^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i, "Invalid closing time format"]
    },
    // Closing time in 12-hour format (e.g., 9:00 PM)
    duration: {
      type: Number,
      required: true,
      min: 0
    },
    // Duration in minutes (e.g., the number of minutes the restaurant is open)
    isHoliday: {
      type: Boolean,
      default: false
    },
    // Flag to mark holidays or closed days
    timeZone: {
      type: String,
      default: "UTC"
    }
    // The time zone of the restaurant (e.g., 'America/New_York')
  },
  { timestamps: true }
  // Adds createdAt and updatedAt fields automatically
);
const OpenHours = import_mongoose.default.model("OpenHours", openHoursSchema);
var openTime_model_default = OpenHours;
