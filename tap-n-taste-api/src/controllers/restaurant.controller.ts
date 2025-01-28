import mongoose from 'mongoose';
import Restaurant from '../models/restaurant.model';
import Location from '../models/location.model';
import Contact from '../models/contact.model';
import OpenHours from '../models/openTime.model';
import Media from '../models/media.model';
import SocialLinks from '../models/socialLinks.model';
import Offer from '../models/offer.model';
import Review from '../models/review.model';
import FAQ from '../models/faq.model';
import Table from '../models/table.model';
import Event from '../models/event.model';
import Feature from '../models/feature.model';
// Create a restaurant
export const createRestaurant = async (req, res, next) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(200).json({restaurant:savedRestaurant,message:"Restaurant created successfully"});
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

// Get all restaurants
export const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find().populate('media');
    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};

// Get a single restaurant
export const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('location')
      .populate('contact')
      .populate('openHours')
      .populate('media')
      .populate('socialLinks')
      .populate('offers')
      .populate('reviews')
      .populate('faq')
      .populate({
        path: 'table',
        options: { sort: { number: 1 } }, // Sorts tables by their 'number' field in ascending order
      })
      .populate('events')
      .populate('features');
    if (!restaurant)
      return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};
export const getAdminRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.user.restaurantId)
      .populate('location')
      .populate('contact')
      .populate('openHours')
      .populate('media')
      .populate('socialLinks')
      .populate('offers')
      .populate('reviews')
      .populate('faq')
      .populate({
        path: 'table',
        options: { sort: { number: 1 } }, // Sorts tables by their 'number' field in ascending order
      })
      .populate('events')
      .populate('features');
    if (!restaurant)
      return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Destructure body, capturing location and contacts
    const {
      location,
      contacts,
      openHours,
      media,
      socialLinks,
      offers, // Added to capture offers
      reviews, // Added to capture reviews
      faq, // Added to capture FAQs
      table, // Added table to the request body
      events, // Added to capture events
      features, // Added to capture features
      menuItems,
      tax,
      ...restaurantData
    } = req.body;

    const restaurantId = req.params.id;
    const userId = req.user.id; // Assuming user ID is attached to `req.user` from the auth middleware

    let locationId, openHoursId, mediaId, socialLinksId, tableId, featuresId;

    // Handle Location Update or Creation
    if (location) {
      if (location._id) {
        // Update existing location and associate with the restaurant and user
        const updatedLocation = await Location.findByIdAndUpdate(
          location._id,
          {
            ...location,
            restaurantId, // Add the restaurant ID
            updatedBy: userId, // Update the user who is modifying the location
          },
          {
            new: true,
            runValidators: true,
            session,
          }
        );
        locationId = updatedLocation?._id;
      } else {
        // Create new location with restaurant and user references
        const newLocation = new Location({
          ...location,
          restaurantId, // Assign the restaurant ID
          createdBy: userId, // The user creating the location
        });
        await newLocation.save({ session });
        locationId = newLocation._id;
      }
    }

    // Handle Contact Updates or Creation
    const contactIds = [];
    if (contacts && Array.isArray(contacts)) {
      for (const contactData of contacts) {
        let contactId;
        if (contactData._id) {
          // Update existing contact and associate with the restaurant and user
          const updatedContact = await Contact.findByIdAndUpdate(
            contactData._id,
            {
              ...contactData,
              restaurant: restaurantId, // Link the contact with the restaurant
              updatedBy: userId, // Update user
            },
            {
              new: true,
              runValidators: true,
              session,
            }
          );
          contactId = updatedContact?._id;
        } else {
          // Create new contact with restaurant and user references
          const newContact = new Contact({
            ...contactData,
            restaurant: restaurantId, // Link the contact with the restaurant
            userId, // The user who is creating the contact
          });
          await newContact.save({ session });
          contactId = newContact._id;
        }
        contactIds.push(contactId);
      }
    }

    // Handle OpenHours Update or Creation
    if (openHours) {
      if (openHours._id) {
        // Update existing OpenHours
        const updatedOpenHours = await OpenHours.findByIdAndUpdate(
          openHours._id,
          {
            ...openHours,
            restaurantId, // Link OpenHours with the restaurant
            updatedBy: userId, // User who is updating the OpenHours
          },
          {
            new: true,
            runValidators: true,
            session,
          }
        );
        openHoursId = updatedOpenHours?._id;
      } else {
        // Create new OpenHours with restaurant and user references
        const newOpenHours = new OpenHours({
          ...openHours,
          restaurantId, // Assign the restaurant ID
          createdBy: userId, // User who is creating the OpenHours
        });
        await newOpenHours.save({ session });
        openHoursId = newOpenHours._id;
      }
    }
    // Handle Media Update or Creation
    if (media) {
      if (media._id) {
        // Update existing Media
        const updatedMedia = await Media.findByIdAndUpdate(
          media._id,
          {
            ...media,
            restaurantId, // Link Media with the restaurant
            updatedBy: userId, // User who is updating the Media
          },
          {
            new: true,
            runValidators: true,
            session,
          }
        );
        mediaId = updatedMedia?._id;
      } else {
        // Create new Media with restaurant and user references
        const newMedia = new Media({
          ...media,
          restaurantId, // Assign the restaurant ID
          createdBy: userId, // User who is creating the Media
        });
        await newMedia.save({ session });
        mediaId = newMedia._id;
      }
    }

    // Handle SocialLinks Update or Creation
    if (socialLinks) {
      if (socialLinks._id) {
        // Update existing SocialLinks
        const updatedSocialLinks = await SocialLinks.findByIdAndUpdate(
          socialLinks._id,
          {
            ...socialLinks,
            restaurant: restaurantId, // Link SocialLinks with the restaurant
            updatedBy: userId, // User who is updating the SocialLinks
          },
          {
            new: true,
            runValidators: true,
            session,
          }
        );
        socialLinksId = updatedSocialLinks?._id;
      } else {
        // Create new SocialLinks with restaurant and user references
        const newSocialLinks = new SocialLinks({
          ...socialLinks,
          restaurant: restaurantId, // Link SocialLinks with the restaurant
          createdBy: userId, // User who is creating the SocialLinks
        });
        await newSocialLinks.save({ session });
        socialLinksId = newSocialLinks._id;
      }
    }
    const offerIds = []; // To store offer IDs
    // Handle Offers Update or Creation
    if (offers && Array.isArray(offers)) {
      for (const offerData of offers) {
        let offerId;
        if (offerData._id) {
          // Update existing offer
          const updatedOffer = await Offer.findByIdAndUpdate(
            offerData._id,
            {
              ...offerData,
              restaurant: restaurantId, // Link offer with the restaurant
              createdBy: userId, // User who is updating the offer
            },
            {
              new: true,
              runValidators: true,
              session,
            }
          );
          offerId = updatedOffer?._id;
        } else {
          // Create new offer with restaurant and user references
          const newOffer = new Offer({
            ...offerData,
            restaurant: restaurantId, // Assign the restaurant ID
            createdBy: userId, // User who is creating the offer
          });
          await newOffer.save({ session });
          offerId = newOffer._id;
        }
        offerIds.push(offerId);
      }
    }
    // Handle Reviews Update or Creation
    let reviewIds = []; // To store review IDs
    if (reviews && Array.isArray(reviews)) {
      for (const reviewData of reviews) {
        let reviewId;
        if (reviewData._id) {
          // Update existing review
          const updatedReview = await Review.findByIdAndUpdate(
            reviewData._id,
            {
              ...reviewData,
              restaurant: restaurantId, // Link review with the restaurant
              user: userId, // The user who is updating the review
            },
            {
              new: true,
              runValidators: true,
              session,
            }
          );
          reviewId = updatedReview?._id;
        } else {
       
          const newReview = new Review({
            ...reviewData,
            restaurant: restaurantId, // Link the review with the restaurant,
            media:mediaId?mediaId:undefined,
            user: userId, // User who is creating the review
          });
          await newReview.save({ session });
          reviewId = newReview._id;
        }
        reviewIds.push(reviewId);
      }
      const existingRestaurant = await Restaurant.findById(restaurantId);
      reviewIds = existingRestaurant ? [...existingRestaurant.reviews, ...reviewIds] : [];
    }

    const faqIds = []; // Array to hold FAQ IDs
    // Handle FAQ Update or Creation
    if (faq && Array.isArray(faq)) {
      for (const faqData of faq) {
        let faqId;
        if (faqData._id) {
          const updatedFAQ = await FAQ.findByIdAndUpdate(
            faqData._id,
            { ...faqData, restaurantId, userId },
            { new: true, runValidators: true, session }
          );
          faqId = updatedFAQ?._id;
        } else {
          const newFAQ = new FAQ({
            ...faqData,
            restaurantId,
            userId,
          });
          await newFAQ.save({ session });
          faqId = newFAQ._id;
        }
        faqIds.push(faqId);
      }
    }

    // Handle Table Update or Creation
    if (table) {
      if (table._id) {
        // Update existing Table
        const updatedTable = await Table.findByIdAndUpdate(
          table._id,
          { ...table, restaurant: restaurantId, updatedBy: userId },
          { new: true, runValidators: true, session }
        );
        tableId = updatedTable?._id;
      } else {
        // Create new Table
        const newTable = new Table({
          ...table,
          restaurant: restaurantId,
          createdBy: userId,
        });
        await newTable.save({ session });
        tableId = newTable._id;
      }
    }
    // Handle Event Update or Creation
    const eventIds = []; // To store event IDs
    if (events && Array.isArray(events)) {
      for (const eventData of events) {
        let eventId;
        if (eventData._id) {
          const updatedEvent = await Event.findByIdAndUpdate(
            eventData._id,
            { ...eventData, restaurant: restaurantId, user: userId },
            { new: true, runValidators: true, session }
          );
          eventId = updatedEvent?._id;
        } else {
          const newEvent = new Event({
            ...eventData,
            restaurant: restaurantId,
            user: userId,
          });
          await newEvent.save({ session });
          eventId = newEvent._id;
        }
        eventIds.push(eventId);
      }
    }

    // Handle Features Update or Creation
    if (features) {
      if (features._id) {
        // Update existing Features
        const updatedFeatures = await Feature.findByIdAndUpdate(
          features._id,
          {
            ...features,
            restaurantId, // Link Features with the restaurant
            updatedBy: userId, // User who is updating the Features
          },
          {
            new: true,
            runValidators: true,
            session,
          }
        );
        featuresId = updatedFeatures?._id;
      } else {
        // Create new Features with restaurant and user references
        const newFeatures = new Feature({
          ...features,
          restaurantId,
          createdBy: userId,
        });
        await newFeatures.save({ session });
        featuresId = newFeatures._id;
      }
    }
    // Handle menu item updates if provided
    let menuIds;
    if (menuItems && Array.isArray(menuItems)) {
      const existingRestaurant = await Restaurant.findById(restaurantId);
      menuIds = existingRestaurant ? [...existingRestaurant.menu, ...menuItems] : [];
    }
    let tableIds=[];
    if (table) {
      const existingRestaurant = await Restaurant.findById(restaurantId);
      tableIds = existingRestaurant ? [...existingRestaurant.table, tableId] : [];
    }
    // Update Restaurant Data with location and contact references
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        ...restaurantData,
        location: locationId, // Update with new or existing location ID
        contact: contactIds.length ? contactIds : undefined, // Update with new or existing contact IDs (only if contacts are provided)
        openHours: openHoursId, // Update with new or existing OpenHours ID
        media: mediaId, // Update with new or existing Media ID
        socialLinks: socialLinksId, // Update with new or existing SocialLinks ID
        offers: offerIds.length ? offerIds : undefined, // Add offers to the restaurant (new or existing)
        faq: faqIds.length ? faqIds : undefined, // Update with FAQs if present
        table: tableIds && tableIds.length ? tableIds : undefined, // Add table reference if exists
        events: eventIds.length ? eventIds : undefined, // Add events to the restaurant (new or existing)
        features: featuresId ? [featuresId] : undefined, // Update features reference
        menu: menuIds && menuIds.length ? menuIds : undefined,
        reviews: reviewIds && reviewIds.length ? reviewIds : undefined,
        tax:tax&&tax.length?[...tax]:undefined
      },
      { new: true, runValidators: true, session }
    );

    if (!updatedRestaurant) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await session.commitTransaction();
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};


export const updateRestaurantMedia = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const restaurantId = req.params.id;
    const userId = req.user.id; // Assumes user ID is provided by auth middleware

    const { banner, logo, gallery, photos, videos, mediaDescription, status, mediaType, tags } = req.body;

    let mediaData = await Media.findOne({ restaurantId });

    if (mediaData) {
      // Update existing media record
      mediaData = await Media.findOneAndUpdate(
        { restaurantId },
        {
          $set: {
            banner,
            logo,
            gallery,
            photos,
            videos,
            mediaDescription,
            status,
            mediaType,
            tags,
            updatedAt: Date.now(),
            createdBy: userId,
          },
        },
        { new: true, runValidators: true, session }
      );
    } else {
      // Create a new media entry if it doesn't exist
      mediaData = new Media({
        restaurantId,
        banner,
        logo,
        gallery,
        photos,
        videos,
        mediaDescription,
        status,
        mediaType,
        tags,
        createdBy: userId,
      });
      await mediaData.save({ session });
    }

    // Ensure the restaurant exists and reference is correct
    const restaurantExists = await Restaurant.findById(restaurantId);
    if (!restaurantExists) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await session.commitTransaction();
    res.status(200).json({ message: 'Media updated successfully', mediaData });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};


// Delete a restaurant
export const deleteRestaurant = async (req, res, next) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant)
      return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    next(error);
  }
};
