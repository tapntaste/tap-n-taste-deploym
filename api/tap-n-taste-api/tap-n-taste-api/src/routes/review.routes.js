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
var review_routes_exports = {};
__export(review_routes_exports, {
  default: () => review_routes_default
});
module.exports = __toCommonJS(review_routes_exports);
var import_express = __toESM(require("express"));
var import_review = require("../controllers/review.controller");
var import_auth = require("../middlewares/auth.middleware");
const reviewRoutes = import_express.default.Router({ mergeParams: true });
reviewRoutes.get("/", import_review.getAllReviewsForRestaurant);
reviewRoutes.get("/:reviewId", import_review.getReviewById);
reviewRoutes.post("/", import_auth.authenticate, import_review.createReview);
reviewRoutes.put("/:reviewId", import_auth.authenticate, import_review.updateReview);
reviewRoutes.delete("/:reviewId", import_auth.authenticate, import_review.deleteReview);
var review_routes_default = reviewRoutes;
