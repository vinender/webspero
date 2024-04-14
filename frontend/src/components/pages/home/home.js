import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Avatar } from '@mui/material'; // Import Material-UI components
import useCurrentUserDetails from '../../utils/currentUserDetails';
 
export default function Home() {
  const { userDetails, loading, error } = useCurrentUserDetails(); // Use the hook to get current user details

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>Error loading user details: {error.message}</p>;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card>
          <CardContent>
            <Grid container justifyContent="center" alignItems="center" marginBottom="1rem">
              <Avatar src={userDetails.profilePic} alt="Profile Pic" sx={{ width: 100, height: 100 }} />
            </Grid>
            <Typography variant="subtitle1" align="center">Name: {userDetails.name}</Typography>
            <Typography variant="subtitle1" align="center">Email: {userDetails.email}</Typography>
            <Typography variant="subtitle1" align="center">Mobile: {userDetails.mobile}</Typography>
            <Typography variant="subtitle1" align="center">Zip Code: {userDetails.zipCode}</Typography>
            <Typography variant="subtitle1" align="center">Address: {userDetails?.address?.formattedAddress }</Typography>
            <Button
  component={Link}
  to="/profile"
  variant="contained"
  color="primary"
  fullWidth
  sx={{ marginBottom: '0.5rem' }} // Add margin bottom to the Edit Profile button
>
  Edit Profile
</Button>
<Button
  component={Link}
  to="/near-by-users"
  variant="contained"
  color="secondary" // Change color to secondary for the Nearby Users button
  fullWidth
>
  Nearby Users
</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
