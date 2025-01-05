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
var menu_routes_exports = {};
__export(menu_routes_exports, {
  default: () => menu_routes_default
});
module.exports = __toCommonJS(menu_routes_exports);
var import_express = __toESM(require("express"));
var import_auth = require("../middlewares/auth.middleware");
var import_menu = require("../controllers/menu.controller");
const menuRoutes = import_express.default.Router({ mergeParams: true });
menuRoutes.post("/", import_auth.authenticate, (0, import_auth.authorize)("Admin", "SuperAdmin"), import_menu.createMenuItem);
menuRoutes.get("/", import_menu.getAllMenuItemsForRestaurant);
menuRoutes.get("/:menuId", import_menu.getMenuItemById);
menuRoutes.put("/:menuId", import_auth.authenticate, (0, import_auth.authorize)("Admin", "SuperAdmin"), import_menu.updateMenuItem);
menuRoutes.delete("/:menuId", import_auth.authenticate, (0, import_auth.authorize)("Admin", "SuperAdmin"), import_menu.deleteMenuItem);
var menu_routes_default = menuRoutes;
