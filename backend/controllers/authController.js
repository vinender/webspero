// userRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
 
 
// Register a new user
const register = async (req, res) => {
    try {
      // Extract user details from request body
      const { name, email, password } = req.body;
  
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
  
      // Save the new user to the database
      await newUser.save();
      const jwtSecret = process.env.JWT_SECRET || 'fallbackSecretKey';
  
      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });
  
      // Return success response with token
      res.status(201).json({ message: 'User registered successfully', token });
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
      const jwtSecret = process.env.JWT_SECRET || 'fallbackSecretKey';

      // Password is correct, generate JWT token
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = { register, login };