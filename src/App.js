// @flow

import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import City from './screens/City/City';
import TenDay from './screens/TenDay/TenDay';
import Error from './screens/Error/Error';
import RNLocation from 'react-native-location';
import SearchCity from './screens/SearchCity/SearchCity';
import Texto from './components/UI/Texto';
const Stack = createStackNavigator();
import {SvgUri} from 'react-native-svg';
import svgUrls from './constants/svgUrls';
const App = (): React$Element<any> => {
  const [userPosition, setUserPosition] = useState<{
    lon: string,
    lat: string,
  } | null>(null);

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0,
    });
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then(granted => {
      if (granted) {
        RNLocation.getLatestLocation({timeout: 60000}).then(latestLocation => {
          setUserPosition({
            lat: latestLocation.latitude,
            lon: latestLocation.longitude,
          });
        });
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{}}>
          <Stack.Screen
            name="City"
            options={({navigation}) => ({
              headerShown: true,
              title: '',
              headerStyle: {
                backgroundColor: 'white',
                height: 80,
              },
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate('SearchCity')}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={svgUrls.search}
                    style={styles.searchIcon}
                  />
                </Pressable>
              ),
            })}>
            {props =>
              !userPosition ? (
                <></>
              ) : (
                <City {...props} userPosition={userPosition} />
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name="TenDays"
            component={TenDay}
            options={({navigation}) => ({
              headerShown: true,
              title: '',
              headerStyle: {
                backgroundColor: 'white',
                height: 80,
              },
            })}
          />
          <Stack.Screen name="SearchCity" component={SearchCity} />
          <Stack.Screen name="Error" component={Error} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
const styles = StyleSheet.create({
  searchIcon: {
    marginRight: 25,
  },
});
