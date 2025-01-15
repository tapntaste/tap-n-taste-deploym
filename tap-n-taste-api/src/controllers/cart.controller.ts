import Menu from "../models/menu.model";
import User from "../models/user.model";

// Add Menu Item to Cart
const addItemToCart = async (req, res) => {
const userId = req.user.id; // Assuming user ID is available in request (e.g., via auth middleware)
    const { menuItemId } = req.body;
  
    try {
      // Check if menu item exists
      const menuItem = await Menu.findById(menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      // Add item to user's cart
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  console.log(user.cart);
  
      // Check if item already exists in cart
      if (user.cart.includes(menuItemId)) {
        return res.status(400).json({ message: 'Item already in cart' });
      }
  
      user.cart=[...user.cart, menuItemId];
      await user.save();
  
      res.status(200).json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
  };
  
  // Remove Menu Item from Cart
const removeItemFromCart = async (req, res) => {
    const userId = req.user.id;
    const { menuItemId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove item from cart
      user.cart = user.cart.filter(item => item.toString() !== menuItemId);
      await user.save();
  
      res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
  };
  export {
    addItemToCart,
    removeItemFromCart,

  };