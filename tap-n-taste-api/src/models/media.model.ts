import mongoose from 'mongoose';

// Define the media schema with more detailed fields
const mediaSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    }, // Link media to a specific restaurant

    banner: {
      type: String,
    }, // Banner image URL (could be a primary image or feature image)
    logo: {
      type: String,
    }, // Banner image URL (could be a primary image or feature image)

    gallery: {
      type: [String],
      default: [],
    }, // Gallery of images (array of image URLs)
    photos: {
      type: [String],
      default: [],
    }, // Gallery of images (array of image URLs)

    videos: {
      type: [String],
      default: [],
    }, // Videos associated with the restaurant (array of video URLs)

    mediaDescription: {
      type: String,
      default: '',
    }, // Optional field to describe the media (e.g., image description)

    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    }, // Media status (active or archived)

    mediaType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
    }, // Media type (image or video)

    uploadedAt: {
      type: Date,
      default: Date.now,
    }, // Timestamp for when the media was uploaded

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }, // User who uploaded the media
    tags: {
      type: [String],
      default: [],
    }, // Tags for categorizing media (e.g., "interior", "food", "events")
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Define an index for faster searches by restaurantId, status, and tags
mediaSchema.index({ restaurantId: 1, status: 1, tags: 1 });

// Model creation
const Media = mongoose.model('Media', mediaSchema);
export default Media;
