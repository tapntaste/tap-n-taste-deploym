var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var route_constant_exports = {};
__export(route_constant_exports, {
  T_ADMIN_FRONTEND_URL: () => T_ADMIN_FRONTEND_URL,
  T_SCANNING_FRONTEND_URL: () => T_SCANNING_FRONTEND_URL
});
module.exports = __toCommonJS(route_constant_exports);
const T_SCANNING_FRONTEND_URL = process.env.T_SCANNING_FRONTEND_URL;
const T_ADMIN_FRONTEND_URL = process.env.T_ADMIN_FRONTEND_URL;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  T_ADMIN_FRONTEND_URL,
  T_SCANNING_FRONTEND_URL
});
