// userController.js
const User = require('../models/User');

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id; // Assuming you have middleware to extract user id from token

    // Find the user by id
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's name and email
    user.name = name;
    user.email = email;

    // Save the updated user
    await user.save();

    // Return updated user
    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  updateUserProfile,
};
