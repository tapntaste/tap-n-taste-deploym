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
var menu_controller_exports = {};
__export(menu_controller_exports, {
  createMenuItem: () => createMenuItem,
  deleteMenuItem: () => deleteMenuItem,
  getAllMenuItemsForRestaurant: () => getAllMenuItemsForRestaurant,
  getMenuItemById: () => getMenuItemById,
  updateMenuItem: () => updateMenuItem
});
module.exports = __toCommonJS(menu_controller_exports);
var import_menu_model = __toESM(require("../models/menu.model.js"));
var import_restaurant_model = __toESM(require("../models/restaurant.model.js"));
const createMenuItem = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { name, price, category, createdBy } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ error: "Required fields are missing" });
    }
    const restaurant = await import_restaurant_model.default.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    const menuItem = new import_menu_model.default({ ...req.body, restaurant: restaurantId });
    const savedMenuItem = await menuItem.save();
    res.status(201).json({ message: "Menu item created successfully", data: savedMenuItem });
  } catch (error) {
    res.status(500).json({ error: "Error creating menu item", details: error.message });
  }
};
const getAllMenuItemsForRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await import_restaurant_model.default.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    const menuItems = await import_menu_model.default.find({ restaurant: restaurantId });
    res.status(200).json({ data: menuItems });
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu items", details: error.message });
  }
};
const getMenuItemById = async (req, res) => {
  try {
    const { id: restaurantId, menuId } = req.params;
    const menuItem = await import_menu_model.default.findOne({ _id: menuId, restaurant: restaurantId });
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.status(200).json({ data: menuItem });
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu item", details: error.message });
  }
};
const updateMenuItem = async (req, res) => {
  try {
    const { id: restaurantId, menuId } = req.params;
    const updatedMenuItem = await import_menu_model.default.findOneAndUpdate(
      { _id: menuId, restaurant: restaurantId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item updated successfully", data: updatedMenuItem });
  } catch (error) {
    res.status(500).json({ error: "Error updating menu item", details: error.message });
  }
};
const deleteMenuItem = async (req, res) => {
  try {
    const { id: restaurantId, menuId } = req.params;
    const deletedMenuItem = await import_menu_model.default.findOneAndDelete({ _id: menuId, restaurant: restaurantId });
    if (!deletedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting menu item", details: error.message });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMenuItem,
  deleteMenuItem,
  getAllMenuItemsForRestaurant,
  getMenuItemById,
  updateMenuItem
});
