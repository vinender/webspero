const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    formattedAddress: {
      type: String,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  },
  zipCode: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
