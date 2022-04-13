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
import Texto from '../../components/UI/Texto';
import {fromUnixTime, format} from 'date-fns';
import svgUrls from '../../constants/svgUrls';
import Button from '../../components/UI/Button';
import {getHours} from 'date-fns/esm/fp';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Daily from './Daily';
interface Props {
  userPosition: {
    lat: string,
    lon: string,
    name?: string,
  };
}

const TenDay = (): React$Element<any> => {
  const route = useRoute();
  const userPosition = route.params.userPosition;
  const today = new Date();
  const apiKey = '237407e66f72b98a0a31c51d80f3f5f7';
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
        <Texto type="title" color="black">
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
      <Texto type="p" color="dimgray">
        10-day forecast
      </Texto>
      <View style={styles.containerDaily}>
        <FlatList
          data={dailyArray}
          renderItem={({item, index}) => (
            <Daily
              day={format(new Date(item.dt * 1000), 'EEEE')}
              icon={item.weather[0].icon}
              maxTemp={Math.round(item.temp.max)}
              minTemp={Math.round(item.temp.min)}
              index={index}
            />
          )}></FlatList>
      </View>
    </View>
  );
};

export default TenDay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'white',
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
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'dimgray',
    borderWidth: 2,
    height: 300,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
  },
});
