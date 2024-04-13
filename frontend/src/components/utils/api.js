import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // You can add other common headers here
  },
});

// Initialize useHistory hook
const navigate = useNavigate();

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log('Request sent:', config);
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Do something with successful response
    console.log('Response received:', response);
    // Save token to local storage if present in response
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response;
  },
  (error) => {
    // Do something with response error
    console.error('Response error:', error);
    // Redirect user to '/' if they are not logged in
    if (error.response.status === 401) {
      navigate('/');
    }
    return Promise.reject(error);
  }
);

export default api;
