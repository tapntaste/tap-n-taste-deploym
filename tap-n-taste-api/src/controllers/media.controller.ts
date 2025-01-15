import Media from '../models/media.model';
import Restaurant from '../models/restaurant.model';

// Create new media entry
export const createMedia = async (req, res, next) => {
  const { restaurantId } = req.params;
  const userId = req.user.id; // Assuming user ID is attached to `req.user`

  const {
    banner,
    logo,
    gallery,
    photos,
    videos,
    mediaDescription,
    mediaType,
    status,
    tags
  } = req.body;

  try {
    // Ensure the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const newMedia = new Media({
      restaurantId,
      banner,
      logo,
      gallery,
      photos,
      videos,
      mediaDescription,
      mediaType,
      status,
      tags,
      createdBy: userId,
    });

    await newMedia.save();
    res.status(201).json({ message: "Media created successfully", data: newMedia });
  } catch (error) {
    next(error);
  }
};

// Update existing media by media ID
export const updateMedia = async (req, res, next) => {
  const { restaurantId, mediaId } = req.params;
  const userId = req.user.id;

  try {
    // Ensure the media entry belongs to the correct restaurant
    const media = await Media.findOne({ _id: mediaId, restaurantId });
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    // Update media details
    const updatedMedia = await Media.findByIdAndUpdate(
      mediaId,
      { ...req.body, updatedBy: userId },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Media updated successfully", data: updatedMedia });
  } catch (error) {
    next(error);
  }
};

// Delete media by media ID
export const deleteMedia = async (req, res, next) => {
  const { restaurantId, mediaId } = req.params;

  try {
    // Ensure the media entry belongs to the correct restaurant
    const media = await Media.findOneAndDelete({ _id: mediaId, restaurantId });
    if (!media) {
      return res.status(404).json({ message: "Media not found or already deleted" });
    }

    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get media by restaurant ID or specific media ID
export const getMedia = async (req, res, next) => {
  const { restaurantId, mediaId } = req.params;

  try {
    if (mediaId) {
      // Fetch a specific media entry by ID
      const media = await Media.findOne({ _id: mediaId, restaurantId });
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }
      return res.status(200).json(media);
    }

    // Fetch all media for the restaurant
    const mediaList = await Media.find({ restaurantId });
    res.status(200).json(mediaList);
  } catch (error) {
    next(error);
  }
};
