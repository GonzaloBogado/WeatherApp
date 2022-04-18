// @flow
import {LogBox} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Home from './screens/Home/Home';
import DailyForecast from './screens/DailyForecast/DailyForecast';
import Error from './screens/Error/Error';
import RNLocation from 'react-native-location';
import SearchCity from './screens/SearchCity/SearchCity';
import Texto from './components/UI/Texto';
const Stack = createStackNavigator();
import COLORS from './constants/colors';
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
        <Stack.Group
          screenOptions={{
            headerTintColor: COLORS.main,
          }}>
          <Stack.Screen
            name="Home"
            options={({navigation, route}) => ({
              headerShown: true,
              title: '',
              headerStyle: {
                backgroundColor: COLORS.background,
                height: 80,
              },

              headerRight: () =>
                route.params ? (
                  <></>
                ) : (
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
                <Home {...props} userPosition={userPosition} />
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name="DailyForecasts"
            component={DailyForecast}
            options={({navigation}) => ({
              headerShown: true,
              title: '',

              headerStyle: {
                backgroundColor: COLORS.background,
                height: 80,
              },
            })}
          />
          <Stack.Screen
            name="SearchCity"
            component={SearchCity}
            options={{
              headerTitle: 'Search City',
            }}
          />
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

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
