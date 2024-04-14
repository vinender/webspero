import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { GoogleApiWrapper } from 'google-maps-react';

const PlacesAutoComplete = ({ google, onAddressSelect }) => {
  const [autocompleteInstance, setAutocompleteInstance] = useState(null);
  const [googleApiReady, setGoogleApiReady] = useState(false);

  useEffect(() => {
    if (google && google.maps) {
      setGoogleApiReady(true);
    }
  }, [google]);

  useEffect(() => {
    if (googleApiReady) {
      // Initialize the Google Places Autocomplete
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete-input'),
        { types: ['address'] }
      );
      setAutocompleteInstance(autocomplete);

      // Add a listener for the 'place_changed' event
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();

        if (place && place.geometry && place.geometry.location) {
          const address = {
            formattedAddress: place.formatted_address,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          };

          // Call the onAddressSelect function with the selected address and coordinates
          if (onAddressSelect) {
            onAddressSelect(address);
          }
        } else {
          alert('The selected place does not have a valid geometry object.');
        }
      });

      // Clean up the Autocomplete instance when the component unmounts
      return () => {
        google.maps.event.clearInstanceListeners(autocomplete);
      };
    }
  }, [googleApiReady, google, onAddressSelect]);

  return (
    <div>
      <TextField
        id="autocomplete-input"
        label="Enter an address"
        variant="outlined"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API,
  libraries: ['places'],
})(PlacesAutoComplete);
