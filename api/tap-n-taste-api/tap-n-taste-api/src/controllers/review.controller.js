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
var review_controller_exports = {};
__export(review_controller_exports, {
  createReview: () => createReview,
  deleteReview: () => deleteReview,
  getAllReviewsForRestaurant: () => getAllReviewsForRestaurant,
  getReviewById: () => getReviewById,
  updateReview: () => updateReview
});
module.exports = __toCommonJS(review_controller_exports);
var import_review = __toESM(require("../models/review.model"));
var import_restaurant = __toESM(require("../models/restaurant.model"));
const createReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review, images } = req.body;
    const userId = req.user.id;
    const restaurantExists = await import_restaurant.default.findById(id);
    if (!restaurantExists) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    const newReview = await import_review.default.create({
      restaurant: id,
      user: userId,
      rating,
      review,
      images
    });
    res.status(201).json({
      message: "Review created successfully.",
      review: newReview
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create review.",
      details: error.message
    });
  }
};
const getAllReviewsForRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await import_review.default.find({ restaurant: id }).populate("user", "name email").sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch reviews.",
      details: error.message
    });
  }
};
const getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await import_review.default.findById(reviewId).populate("user", "name email");
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch review.",
      details: error.message
    });
  }
};
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, review, images } = req.body;
    const userId = req.user.id;
    const updatedReview = await import_review.default.findOneAndUpdate(
      { _id: reviewId, user: userId },
      // Only review owner can update
      { rating, review, images },
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found or unauthorized." });
    }
    res.status(200).json({
      message: "Review updated successfully.",
      review: updatedReview
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update review.",
      details: error.message
    });
  }
};
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const deletedReview = await import_review.default.findOneAndDelete({
      _id: reviewId,
      user: userId
      // Ensure only review owner can delete
    });
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found or unauthorized." });
    }
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete review.",
      details: error.message
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createReview,
  deleteReview,
  getAllReviewsForRestaurant,
  getReviewById,
  updateReview
});
