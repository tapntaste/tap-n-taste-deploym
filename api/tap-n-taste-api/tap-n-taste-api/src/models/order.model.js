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
var order_model_exports = {};
__export(order_model_exports, {
  default: () => order_model_default
});
module.exports = __toCommonJS(order_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const orderSchema = new import_mongoose.default.Schema(
  {
    user: { type: import_mongoose.default.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    items: [
      {
        menuItem: {
          type: import_mongoose.default.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
      }
    ],
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },
    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Confirmed",
        "In Preparation",
        "Ready for Pickup",
        "Out for Delivery",
        "Completed",
        "Cancelled"
      ],
      default: "Placed"
    },
    customerNote: { type: String },
    adminNote: { type: String },
    deliveryAddress: {
      street: { type: String },
      city: { type: String },
      zipCode: { type: String },
      country: { type: String }
    },
    deliveryMethod: { type: String, enum: ["Pickup", "Delivery"], default: "Delivery" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
const Order = import_mongoose.default.model("Order", orderSchema);
var order_model_default = Order;
