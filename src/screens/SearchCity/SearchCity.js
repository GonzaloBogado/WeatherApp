// @flow

import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import GooglePlacesInput from './GooglePlacesInput';

const SearchCity = (): React$Element<any> => {
  return (
    <>
      <GooglePlacesInput />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 20,
  },
  inputContainer: {
    paddingTop: 10,
  },
  suggestions: {
    backgroundColor: 'blue',
  },
});

export default SearchCity;
