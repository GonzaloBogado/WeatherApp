// @flow
import React from 'react';
import {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {GOOGLEAPIKEY} from 'react-native-dotenv';
import {SvgUri} from 'react-native-svg';
import {useRoute} from '@react-navigation/native';
import svgUrls from '../../constants/svgUrls';
import Texto from '../../components/UI/Texto';
import COLORS from '../../constants/colors';
const GooglePlacesInput = (): React$Element<any> => {
  const [loading, setLoading] = useState(false);
  const apiKey = GOOGLEAPIKEY;
  const route = useRoute();
  console.log(route.name);
  const navigation = useNavigation();
  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <Texto type="title" color={COLORS.main}>
          Loading
        </Texto>
      </View>
    );
  return (
    <>
      <SvgUri
        width="14"
        height="14"
        uri={svgUrls.search}
        style={styles.noDisplay}
      />
      <GooglePlacesAutocomplete
        fetchDetails={false}
        query={{
          key: apiKey,
          language: 'en',
          types: '(cities)',
        }}
        enablePoweredByContainer={false}
        placeholder="Search"
        suppressDefaultStyles={true}
        styles={autocompleteStlyes}
        listEmptyComponent={() => (
          <Text style={styles.noLocationText}>No location found</Text>
        )}
        renderRow={(data, index) => {
          const offset = data.matched_substrings[0].offset;
          const length = data.matched_substrings[0].length;
          return (
            <>
              <SvgUri
                width="14"
                height="14"
                uri={svgUrls.search}
                style={styles.searchIcon}
              />
              <Text>
                <Text style={styles.lightText}>
                  {data.description.slice(0, offset)}
                </Text>
                <Text style={styles.boldText}>
                  {data.description.slice(offset, offset + length)}
                </Text>
                <Text style={styles.lightText}>
                  {data.description.slice(offset + length)}
                </Text>
              </Text>
            </>
          );
        }}
        onPress={async data => {
          setLoading(true);
          // 'details' is provided when fetchDetails = true
          const placeId = data.place_id;
          const fetchLocation = async (placeId: number) => {
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

          navigation.push('Home', {
            userPosition,
          });

          setTimeout(() => {
            setLoading(false);
          }, 500);
        }}
      />
    </>
  );
};

export default GooglePlacesInput;

const autocompleteStlyes = {
  textInputContainer: {
    borderColor: COLORS.main,
    borderWidth: 1,
    borderRadius: 12,
    height: 45,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: COLORS.background,
  },
  textInput: {
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: COLORS.background,
    padding: 13,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: '700',
  },
  lightText: {
    color: COLORS.secondary,
  },
  noLocationText: {
    textAlign: 'center',
    padding: 10,
    paddingVertical: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  noDisplay: {
    display: 'none',
  },
  loadingContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
