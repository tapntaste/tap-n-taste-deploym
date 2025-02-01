import mongoose from "mongoose";

const featuresSchema = new mongoose.Schema(
 {
    isOrderOnline: { type: Boolean, default: false },
    isReviewActivated: { type: Boolean, default: false },
    isBookTable: { type: Boolean, default: false },
    isEventBook: { type: Boolean, default: false },
    isArMenu: { type: Boolean, default: false },
    isMenuAvailable: { type: Boolean, default: false },
    isDineInAvailable: { type: Boolean, default: false },
    isDeliveryAvailable: { type: Boolean, default: false },
    isTakeawayAvailable: { type: Boolean, default: false },
    isPureVeg: { type: Boolean, default: false },
    isNonVeg: { type: Boolean, default: false },
 },
  { timestamps: true }
);

// Create and export the Event model
const Feature = mongoose.model('Feature', featuresSchema);
export default Feature;