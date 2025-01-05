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
var restaurant_controller_exports = {};
__export(restaurant_controller_exports, {
  createRestaurant: () => createRestaurant,
  deleteRestaurant: () => deleteRestaurant,
  getRestaurantById: () => getRestaurantById,
  getRestaurants: () => getRestaurants,
  updateRestaurant: () => updateRestaurant
});
module.exports = __toCommonJS(restaurant_controller_exports);
var import_restaurant = __toESM(require("../models/restaurant.model"));
const createRestaurant = async (req, res, next) => {
  try {
    const newRestaurant = new import_restaurant.default(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    next(error);
  }
};
const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await import_restaurant.default.find();
    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};
const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await import_restaurant.default.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};
const updateRestaurant = async (req, res, next) => {
  try {
    const updatedRestaurant = await import_restaurant.default.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedRestaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    next(error);
  }
};
const deleteRestaurant = async (req, res, next) => {
  try {
    const deletedRestaurant = await import_restaurant.default.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRestaurant,
  deleteRestaurant,
  getRestaurantById,
  getRestaurants,
  updateRestaurant
});
