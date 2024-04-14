import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login, updateUser } from '../../utils/redux/reducers/authActions';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Uploader from '../../uploader/uploader';
import { useNavigate } from 'react-router-dom';
import http from '../../utils/http';
import GooglePlacesAutocomplete from '../../GooglePlacesAutocomplete';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(3),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    backgroundColor: '#ffffff',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const RegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUrlChange = (imageUrl) => {
    setFormData({ ...formData, profilePic: imageUrl });
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
  console.log(formData);
  // return '';
    try {
      const response = await http.post(`${process.env.REACT_APP_API_URL}/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Registration successful:', response.data);
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      dispatch(login(response.data.user));
      dispatch(updateUser(response.data.user));
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.form}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <GooglePlacesAutocomplete onAddressSelect={handleAddressSelect} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobile"
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zipCode"
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Uploader onImageUrlChange={handleImageUrlChange} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" align="center">
          If already registered, <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </Box>
  );
};