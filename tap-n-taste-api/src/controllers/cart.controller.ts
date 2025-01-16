import Menu from "../models/menu.model";
import User from "../models/user.model";

// Add Menu Item to Cart
// const addItemToCart = async (req, res) => {

// const userId = req.user.id; // Assuming user ID is available in request (e.g., via auth middleware)
//     const { menuItemId } = req.body;
  
//     try {
//       // Check if menu item exists
//       const menuItem = await Menu.findById(menuItemId);
//       if (!menuItem) {
//         return res.status(404).json({ message: 'Menu item not found' });
//       }
  
//       // Add item to user's cart
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//   console.log(user.cart);
  
//       // Check if item already exists in cart
//       if (user.cart.includes(menuItemId)) {
//         return res.status(400).json({ message: 'Item already in cart' });
//       }
  
//       user.cart=[...user.cart, menuItemId];
//       await user.save();
  
//       res.status(200).json({ message: 'Item added to cart', cart: user.cart });
//     } catch (error) {
//       res.status(500).json({ message: 'Error adding item to cart', error: error.message });
//     }
//   };
  
  // Remove Menu Item from Cart


  const addItemToCart = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in request (e.g., via auth middleware)
    const { menuItemId, quantity } = req.body; // Expect both menuItemId and quantity from the request
  
    try {
      // Validate input
      if (!menuItemId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid menu item or quantity' });
      }
  
      // Check if menu item exists
      const menuItem = await Menu.findById(menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      // Fetch user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find if the menu item already exists in the cart
      const existingCartItem = user.cart.find((item) => item.menuItemId.toString() === menuItemId);
  
      if (existingCartItem) {
        // If the item exists, increment the quantity
        existingCartItem.quantity += quantity;
      } else {
        // If the item does not exist, add it to the cart
        user.cart.push({ menuItemId, quantity });
      }
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({ message: 'Item added/updated in cart', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
  };
  
  
  const removeItemFromCart = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in request (e.g., via auth middleware)
    const { menuItemId } = req.body;
  
    try {
      // Validate input
      if (!menuItemId) {
        return res.status(400).json({ message: 'Invalid menu item ID' });
      }
  
      // Fetch user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove the item from the cart
      const cartLengthBefore = user.cart.length;
      user.cart = user.cart.filter((item) => item.menuItemId.toString() !== menuItemId);
  
      // Check if any item was removed
      if (cartLengthBefore === user.cart.length) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      // Save updated user document
      await user.save();
  
      res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
  };

const getUserCart = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available via authentication middleware
  
    try {
      // Fetch the user along with populated cart items
      const user = await User.findById(userId).populate('cart.menuItemId');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Format the response with cart details
      const cartDetails = user.cart.map((item) => ({
        menuItem: item.menuItemId, // Contains the populated menu item details
        quantity: item.quantity,
      }));
  
      res.status(200).json({ cart: cartDetails });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
  };
  
  export {
    addItemToCart,
    removeItemFromCart,
    getUserCart
  };