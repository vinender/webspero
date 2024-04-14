import React, { useEffect, useState } from 'react';
 import useCurrentUserDetails from '../../utils/currentUserDetails';
import useAllUsers from '../../utils/get-all-users';

const NearByUsers = () => {
  const { userDetails } = useCurrentUserDetails();
  const { users } = useAllUsers();
  const [nearestUsers, setNearestUsers] = useState([]);

  useEffect(() => {
    if (userDetails && users.length > 0) {
      // Calculate distance between current user and other users
      const sortedUsers = users
        .map((user) => ({
          ...user,
          distance: calculateDistance(userDetails?.address?.latitude, userDetails?.address?.longitude, user?.address?.latitude, user?.address?.longitude)
        }))
        .sort((a, b) => a.distance - b.distance);

      // Get the 5 nearest users
      const nearest = sortedUsers.slice(1, 6); // Exclude current user from nearest users

      setNearestUsers(nearest);
    }
  }, [userDetails, users]);

  // Function to calculate distance between two points (using Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Function to convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      <h2>Nearest Users</h2>
      <ul>
        {nearestUsers.map((user) => (
          <li key={user._id}>
            <strong>Name:</strong> {user.name}, <strong>Distance:</strong> {user.distance.toFixed(2)} km
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearByUsers;
