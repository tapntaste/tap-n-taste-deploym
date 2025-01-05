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
var faq_model_exports = {};
__export(faq_model_exports, {
  default: () => faq_model_default
});
module.exports = __toCommonJS(faq_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const faqSchema = new import_mongoose.default.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true
    },
    // The question asked in the FAQ
    answer: {
      type: String,
      required: true,
      trim: true
    },
    // The answer to the FAQ
    restaurantId: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    // Reference to the restaurant related to the FAQ (if applicable)
    userId: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // Reference to the user who created or updated the FAQ
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active"
    },
    // Status to determine if the FAQ is active or archived
    category: {
      type: String,
      enum: ["general", "menu", "order", "delivery", "other"],
      default: "general"
    },
    // Category to classify the FAQ (e.g., menu, order-related, general)
    createdAt: {
      type: Date,
      default: Date.now
    },
    // Timestamp when the FAQ was created
    updatedAt: {
      type: Date
    }
    // Timestamp when the FAQ was last updated
  },
  { timestamps: true }
);
const FAQ = import_mongoose.default.model("FAQ", faqSchema);
var faq_model_default = FAQ;
