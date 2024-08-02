import React, {useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as Icons from 'react-native-heroicons/outline';
import {styles} from '../styles';
import {GooglePlacesProps} from '../types';

const GooglePlacesInput = (googlePlacesProps: GooglePlacesProps) => {
  const {onPress} = googlePlacesProps;
  const googlePlacesRef = useRef(null);

  return (
    <GooglePlacesAutocomplete
      ref={googlePlacesRef}
      placeholder="Search for a city or airport"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        let dataToPass = {
          address: data.description,
          location: {
            latitude: details?.geometry.location.lat,
            longitude: details?.geometry.location.lng,
          },
        };
        onPress(dataToPass);
      }}
      fetchDetails={true}
      query={{
        key: 'AIzaSyCPzSkJWxK7ey-YYnz2Dg5qj-NujiVrUF4',
        language: 'en',
        type: '(cities)',
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'geometry',
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'airport',
      }}
      filterReverseGeocodingByTypes={[
        'administrative_area_level_3',
        'locality',
      ]} // filter
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      textInputProps={{
        testID: 'GooglePlaceInput',
        placeholderTextColor: 'gray',
        returnKeyType: 'search',
        clearButtonMode: 'never',
      }}
      styles={{
        textInputContainer: {
          ...styles.textInputContainer,
          backgroundColor: 'transparent',
          borderWidth: 0.5,
          borderColor: '#cecece',
          borderRadius: 12,
        },
        description: {
          color: 'black',
        },
        textInput: {
          color: 'black',
          backgroundColor: 'transparent',
          margin: 5,
          borderRadius: 12,
        },
        listView: {
          backgroundColor: 'transaparent',
        },
        row: {
          backgroundColor: 'transparent',
        },
        container: {
          backgroundColor: 'transparent',
        },
        poweredContainer: {
          backgroundColor: 'transparent',
        },
        separator: {
          borderBottomColor: 'white',
          borderTopColor: 'white',
        },
      }}
      renderLeftButton={() => (
        <TouchableOpacity
          style={{marginStart: 5, padding: 2}}
          onPress={() => {
            googlePlacesRef?.current?.focus();
          }}>
          <Icons.MagnifyingGlassIcon />
        </TouchableOpacity>
      )}
      renderRightButton={() => (
        <TouchableOpacity
          style={{marginEnd: 5, padding: 2}}
          onPress={() => {
            googlePlacesRef?.current?.clear();
          }}>
          <Icons.XMarkIcon />
        </TouchableOpacity>
      )}
    />
  );
};

export default GooglePlacesInput;
