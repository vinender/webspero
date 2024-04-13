import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import useAuth from '../../utils/useAuth';



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
    useAuth();
    const classes = useStyles();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Make PUT request to your backend API
          const response = await axios.put(`http://localhost:5000/profile`, formData);
      
          // Handle success response
          console.log('Profile updated successfully:', response.data);
      
          // Optionally, you can redirect the user to another page or show a success message
        } catch (error) {
          // Handle error response
          console.error('Profile update failed:', error.response.data);
          // Optionally, you can show an error message to the user
        }
      };
  
    return (
      <Box className={classes.container}>
        <div>
          <h1>Update Profile</h1>
          <form className={classes.form} onSubmit={handleSubmit}>
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
                id="password"
                label="New Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
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
