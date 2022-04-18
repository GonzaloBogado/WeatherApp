// @flow

import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import useAxios from '../../hooks/useAxios';
import COLORS from '../../constants/colors';
import Texto from '../../components/UI/Texto';
import {fromUnixTime, format} from 'date-fns';
import svgUrls from '../../constants/svgUrls';
import Button from '../../components/UI/Button';
import {getHours} from 'date-fns/esm/fp';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {OPENWEATHERKEY} from 'react-native-dotenv';
import DailyInfoRow from './DailyInfoRow';
import HorizontalList from '../../components/HorizontalList';
interface Props {
  userPosition: {
    lat: string,
    lon: string,
    name?: string,
  };
}

const DailyForecast = (): React$Element<any> => {
  const route = useRoute();
  const userPosition = route.params.userPosition;
  const today = new Date();
  const apiKey = OPENWEATHERKEY;
  const navigation = useNavigation();
  const {
    response: weatherDaily,
    error,
    loading,
  } = useAxios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${userPosition.lat}&exclude=minutely&units=metric&lon=${userPosition.lon}&appid=${apiKey}`,
  });
  const {
    response: weatherInfo,
    error: err,
    loading: loading2,
  } = useAxios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition.lat}&lon=${userPosition.lon}&units=metric&appid=${apiKey}`,
  });
  if (loading || loading2)
    return (
      <View style={styles.container}>
        <Texto type="title" color={COLORS.main}>
          Loading
        </Texto>
      </View>
    );
  const dailyArray = weatherDaily.daily;
  return (
    <View style={styles.container}>
      <Texto type="p">Today, {format(today, 'do MMMM')}</Texto>
      <Texto type="title">{userPosition.name || weatherInfo.name}</Texto>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userPosition.lat,
          longitude: userPosition.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          key={Math.random()}
          coordinate={{
            latitude: userPosition.lat,
            longitude: userPosition.lon,
          }}
          title={userPosition.name || weatherInfo.name}
        />
      </MapView>
      <Texto type="p" color={COLORS.secondary}>
        10-day forecast
      </Texto>
      <View style={styles.containerDaily}>
        <FlatList
          data={dailyArray}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <DailyInfoRow
              day={format(new Date(item.dt * 1000), 'EEEE')}
              icon={item.weather[0].icon}
              maxTemp={Math.round(item.temp.max)}
              minTemp={Math.round(item.temp.min)}
              index={index}
              //all of this props are item dependant, how do I
              //pass that to every specific item when rendering
            />
            /* <HorizontalList
              data={dailyArray}
              day=?
              icon=?
              maxTemp=?
              minTemp=?
              index=?
            /> */
          )}></FlatList>
      </View>
    </View>
  );
};

export default DailyForecast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  flex: {
    flexDirection: 'row',
  },
  map: {
    width: 300,
    height: 200,
    borderRadius: 20,
    marginVertical: 20,
  },
  containerDaily: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 330,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
