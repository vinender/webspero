import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
import axios from 'axios';
import useAuth from '../../utils/useAuth';
import { useSelector } from 'react-redux';
import useCurrentUserDetails from '../../utils/currentUserDetails';
import http from '../../utils/http';
import { useNavigate } from 'react-router-dom';
import GooglePlacesAutocomplete from '../../GooglePlacesAutocomplete';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import Uploader from '../../uploader/uploader';


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Set the container height to full viewport height
    },
    form: {
      width: '100%', // Full width
      maxWidth: 400, // Set maximum width
      padding: theme.spacing(3),
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect
      borderRadius: theme.spacing(1),
      backgroundColor: '#ffffff', // Background color
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  
const Profile = () => {
  const { userDetails, loading, error } = useCurrentUserDetails();
  const navigate = useNavigate();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    zipCode: '',
    profilePic: null,
    address: '',
    latitude: 0,
    longitude: 0,
  });


 


  useEffect(() => {
    const fetchUserData = async () => {
      if (userDetails?._id) {
        try {
          const response = await http.get(`${process.env.REACT_APP_API_URL}/users/${userDetails._id}`);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            mobile: response.data.mobile,
            zipCode: response.data.zipCode,
            address: response?.data?.address?.formattedAddress || '',
            profilePic:response.data.profilePic,
            password: '',
            // confirmPassword: '',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Optionally, you can show an error message to the user
        }
      }
    };

    fetchUserData();
  }, [userDetails]); // Run this effect whenever userDetails changes
  console.log('user data',formData)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUrlChange = (imageUrl) => {
    setFormData({ ...formData, profilePic: imageUrl   });
  };


  const handleAddressSelect = (address) => {
    setFormData({
      ...formData,
      address: {
      formattedAddress: address.formattedAddress,
      latitude: address.latitude,
      longitude: address.longitude,
    }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails?._id) {
      try {
        // Create a new FormData object
        const formDataToSend = new FormData();
  
        // Append the form data fields to the FormData object
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('mobile', formData.mobile);
        formDataToSend.append('zipCode', formData.zipCode);
        formDataToSend.append('password', formData.password);
  
        // Check if a new image has been uploaded
        if (formData.profilePic instanceof File) {
          // Append the new image file to the FormData object
          formDataToSend.append('profilePic', formData.profilePic);
        } else {
          // If no new image has been uploaded, send the existing profilePic URL
          formDataToSend.append('profilePic', formData.profilePic);
        }
  
        // Make the PUT request with the FormData object
        const response = await http.put(`${process.env.REACT_APP_API_URL}/profile/${userDetails?._id}`, formDataToSend);
        console.log('Profile updated successfully:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Profile update failed:', error.response.data);
        // Optionally, you can show an error message to the user
      }
    }
  };
  
  

    return (
      <Box className={classes.container}>
        <div>
          <h1>Update Profile</h1>
          <form className={classes.form} onSubmit={handleSubmit}>
          <Grid item xs={12}>
              <Uploader onImageUrlChange={handleImageUrlChange} profilePic={formData.profilePic} />
            </Grid>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
            />
             <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="mobile"
                label="Mobile"
                name="mobile"
                autoComplete="mobile"
                value={formData.mobile}
                onChange={handleChange}
            />
            <Grid item xs={12}>
              {/* <GooglePlacesAutocomplete  onAddressSelect={handleAddressSelect} /> */}
            </Grid>
             <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="zipCode"
                label="Zip Code"
                name="zipCode"
                autoComplete="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Save
            </Button>
            </form>

        </div>
      </Box>
    );
  };
  

export default Profile;
