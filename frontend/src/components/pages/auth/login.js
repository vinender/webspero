import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import  { useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { login, updateUser } from '../../utils/redux/reducers/authActions';
 import { useNavigate } from 'react-router-dom';
import http from '../../utils/http';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center', // Horizontally center the content
    alignItems: 'center', // Vertically center the content
    minHeight: '100vh', // Make container full height of viewport
    backgroundColor: '#f5f5f5', // Background color
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


export const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });
      
      // Handle successful login response (e.g., store token, redirect)
      console.log('Login successful:', response.data);

      // Dispatch login action to update state
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      dispatch(login(response.data.user));
      console.log(response.data.user);
      dispatch(updateUser(response.data.user));
      navigate('/');
    } catch (error) {
      // Handle login error (e.g., display error message)
      console.error('Login failed:', error.message);
    }
  };

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.form}>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        <Typography variant="body2" align="center">
          If not registered, <Link to="/register">register here</Link>
        </Typography>
      </Box>
    </Box>
  );
};