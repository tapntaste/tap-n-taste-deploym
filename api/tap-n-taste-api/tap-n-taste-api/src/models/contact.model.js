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
var contact_model_exports = {};
__export(contact_model_exports, {
  default: () => contact_model_default
});
module.exports = __toCommonJS(contact_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const contactSchema = new import_mongoose.default.Schema(
  {
    phone: {
      type: String,
      required: true,
      trim: true
    },
    // Contact phone number
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
    },
    // Contact email address
    restaurant: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    // Reference to the restaurant the contact information belongs to
    userId: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // User who created or owns this contact information
    contactType: {
      type: String,
      enum: ["General", "Support", "Sales", "Marketing", "Other"],
      default: "General"
    },
    // Type of contact (e.g., general inquiries, support, sales, etc.)
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active"
    },
    // Status of the contact information
    preferredContactMethod: {
      type: String,
      enum: ["Email", "Phone", "SMS", "WhatsApp", "Other"],
      default: "Email"
    },
    // Preferred contact method for communication
    createdAt: {
      type: Date,
      default: Date.now
    },
    // Date when the contact was created
    updatedAt: {
      type: Date
    }
    // Last updated date
  },
  { timestamps: true }
);
const Contact = import_mongoose.default.model("Contact", contactSchema);
var contact_model_default = Contact;
