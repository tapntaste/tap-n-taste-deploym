import { Request, Response } from 'express';
import Restaurant from '../models/restaurant.model';
import Table from '../models/table.model';
import User from '../models/user.model';
// Controller to change the table for a user
export const changeTableForUser = async (req: Request, res: Response) => {
  try {
    const { restaurantId, tableId } = req.body; // Get restaurantId and tableId from request body
    const userId = req.user.id; // Get userId from authenticated user (req.user.id)

    // Step 1: Check if the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    // Step 2: Check if the table exists in the given restaurant
    const table = await Table.findOne({ _id: tableId, restaurant: restaurantId });
    if (!table) {
      return res.status(404).json({ message: 'Table not found in this restaurant.' });
    }



    // Step 4: Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Step 5: Assign the table to the user if all checks pass
    user.table = tableId;
    await user.save();

    // Step 6: Mark the table as reserved for the user
    table.bookings.push({
      user: userId,
      bookingTime: new Date(),
    });
    await table.save();

    // Respond with success
    return res.status(200).json({ message: 'Table changed successfully.' });
  } catch (error) {
    console.error('Error assigning table:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};
