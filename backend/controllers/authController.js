// userRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer'); // For handling multipart form-data
const upload = multer({ dest: 'uploads/' }); // Specify the directory to store uploaded files
const authenticate = require('../middleware/index');



// Register a new user
const register = async (req, res) => {
  console.log('payload', req.body);
  try {
    // Extract user details from request body
    const { name, email, password, phone, mobile, zipCode, profilePic, address } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Extract address details
    // const { formattedAddress, latitude, longitude } = address;

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      mobile,
      zipCode,
      profilePic, // Assuming profilePic is a file path
      address
    });

    // Save the new user to the database
    await newUser.save();
    const jwtSecret = process.env.JWT_SECRET || 'mySecretKey';

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '12h' });

    // Return success response with token and user details
    res.status(201).json({ message: 'User registered successfully', token, user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  
// Login route
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists in the database
      const users = await User.find({ email });
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = users[0];
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const jwtSecret = process.env.JWT_SECRET || 'mySecretKey';

      // Password is correct, generate JWT token
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '12h' });
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  

module.exports = { register, login };