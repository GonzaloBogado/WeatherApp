// @flow
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const GooglePlacesInput = (): React$Element<any> => {
  const apiKey = 'AIzaSyAV3ixpzapiyRHVrA_ocEAGyNjvvaxKfCs';
  const navigation = useNavigation();
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      style={{paddingHorizontal: 10}}
      onPress={async (data, details = null) => {
        // 'details' is provided when fetchDetails = true
        const placeId = data.place_id;
        const fetchLocation = async (placeId: any) => {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`,
          );
          return {
            lat: response.data.result.geometry.location.lat,
            lon: response.data.result.geometry.location.lng,
            name: data.structured_formatting.main_text,
          };
        };
        const userPosition = await fetchLocation(placeId);
        navigation.navigate('TenDays', {
          userPosition,
        });
      }}
      query={{
        key: 'AIzaSyAV3ixpzapiyRHVrA_ocEAGyNjvvaxKfCs',
        language: 'en',
      }}
    />
  );
};
export default GooglePlacesInput;
