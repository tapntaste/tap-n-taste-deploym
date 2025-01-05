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
var restaurant_routes_exports = {};
__export(restaurant_routes_exports, {
  default: () => restaurant_routes_default
});
module.exports = __toCommonJS(restaurant_routes_exports);
var import_express = __toESM(require("express"));
var import_auth = require("../middlewares/auth.middleware");
var import_restaurant = require("../controllers/restaurant.controller");
var import_menu = __toESM(require("./menu.routes"));
var import_review = __toESM(require("./review.routes"));
var import_order = __toESM(require("./order.routes"));
const restaurantRoutes = import_express.default.Router();
restaurantRoutes.use("/:id/menu", import_menu.default);
restaurantRoutes.use("/:id/orders", import_order.default);
restaurantRoutes.use("/:id/reviews", import_review.default);
restaurantRoutes.post("/", import_auth.authenticate, (0, import_auth.authorize)("SuperAdmin"), import_restaurant.createRestaurant);
restaurantRoutes.put("/:id", import_auth.authenticate, (0, import_auth.authorize)("SuperAdmin"), import_restaurant.updateRestaurant);
restaurantRoutes.delete("/:id", import_auth.authenticate, (0, import_auth.authorize)("SuperAdmin"), import_restaurant.deleteRestaurant);
restaurantRoutes.get("/", import_restaurant.getRestaurants);
restaurantRoutes.get("/:id", import_restaurant.getRestaurantById);
var restaurant_routes_default = restaurantRoutes;
