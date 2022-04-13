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
import StatusIcon from './StatusIcon';
import svgUrls from '../../constants/svgUrls';
import Button from '../../components/UI/Button';
import {SvgUri} from 'react-native-svg';
import Hourly from './Hourly';
import {getHours} from 'date-fns/esm/fp';
import InfoSquare from './InfoSquare';
import {useNavigation} from '@react-navigation/native';

interface Props {
  userPosition: {
    lat: string,
    lon: string,
  };
}

const City = ({userPosition}: Props): React$Element<any> => {
  const [date, setDate] = useState(new Date());
  const [position, setPosition] = useState({});
  const today = new Date();
  const apiKey = '237407e66f72b98a0a31c51d80f3f5f7';
  const navigation = useNavigation();
  const {
    response: weatherHourly,
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
  const hourlyArray = weatherHourly.hourly.slice(0, 24);

  const pop = weatherHourly.hourly[0].pop * 100;
  const temp = weatherInfo.main.temp;
  const feelsLike = weatherInfo.main.feels_like;
  const tempMin = weatherInfo.main.temp_min;
  const tempMax = weatherInfo.main.temp_max;
  const pressure = weatherInfo.main.pressure;
  const humidity = weatherInfo.main.humidity;
  const windSpeed = weatherInfo.wind.speed;

  return (
    <View style={styles.container}>
      <Texto type="p">Today, {format(today, 'do MMMM')}</Texto>
      <Texto type="title">{weatherInfo.name}</Texto>
      <Texto type="p" color="dimgray">
        {weatherInfo.weather[0].main}, {weatherInfo.weather[0].description}
      </Texto>
      <Image
        style={styles.weatherImage}
        source={{
          uri: `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`,
        }}
      />
      <View style={styles.tempAndIcons}>
        <StatusIcon svg={svgUrls.rain} text={`${pop} %`} color="dimgray" />
        <View style={styles.tempBox}>
          <Texto type="temp">{Math.round(temp)}°</Texto>
          <Texto type="p" color="dimgray">
            {' '}
            Feels like: {Math.round(feelsLike)}°
          </Texto>
          <Texto type="p" color="dimgray">
            Min: {Math.round(tempMin)}° Max: {Math.round(tempMax)}°
          </Texto>
        </View>
        <StatusIcon
          svg={svgUrls.wind}
          text={`${Math.round(windSpeed)} km/h`}
          color="dimgray"
        />
      </View>
      <Button
        content={
          <Pressable
            style={styles.buttonIn}
            onPress={() =>
              navigation.navigate('TenDays', {
                userPosition: {
                  lat: userPosition.lat,
                  lon: userPosition.lon,
                },
              })
            }>
            <Texto noMargin type="p">
              View 10 Day forecast
            </Texto>
            <SvgUri
              width="17"
              height="17"
              uri={svgUrls.arrowRight}
              style={styles.buttonIcon}
            />
          </Pressable>
        }
      />
      <View style={styles.tempHourly}>
        <FlatList
          horizontal={true}
          data={hourlyArray}
          keyExtractor={item => `${item.dt} ${item.temp}`}
          renderItem={({item, index}) => (
            <Hourly
              hour={getHours(new Date(item.dt * 1000))}
              temp={Math.round(item.temp)}
              icon={item.weather[0].icon}
              index={index}
            />
          )}
        />
      </View>
      <View style={styles.squareBlocks}>
        <ScrollView horizontal>
          <InfoSquare
            content={
              <View>
                <View style={styles.flex}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={svgUrls.visibility}
                    style={styles.buttonIcon}
                  />
                  <Texto type="p" color="dimgray">
                    Visibility
                  </Texto>
                </View>
                <Texto style={styles.visibility} type="title">
                  {Math.round(weatherInfo.visibility / 1000)} km
                </Texto>
                <View style={styles.extraText}>
                  <Texto type="p" color="dimgray">
                    {weatherInfo.weather[0].description} {'     '}
                  </Texto>
                </View>
              </View>
            }
          />
          <InfoSquare
            content={
              <>
                <View style={styles.flex}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={svgUrls.humidity}
                    style={styles.buttonIcon}
                  />
                  <Texto type="p" color="dimgray">
                    Humidity
                  </Texto>
                </View>
                <Texto style={styles.visibility} type="title">
                  {Math.round(weatherInfo.main.humidity)} %
                </Texto>
              </>
            }
          />
          <InfoSquare
            content={
              <>
                <View style={styles.flex}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={svgUrls.pressure}
                    style={styles.buttonIcon}
                  />
                  <Texto type="p" color="dimgray">
                    Pressure
                  </Texto>
                </View>
                <Texto style={styles.visibility} type="title">
                  {Math.round(weatherInfo.main.pressure)} mbar
                </Texto>
              </>
            }
          />
          <InfoSquare
            content={
              <>
                <View style={styles.flex}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={svgUrls.sunrise}
                    style={styles.buttonIcon}
                  />
                  <Texto type="p" color="dimgray">
                    Sunrise
                  </Texto>
                </View>
                <Texto style={styles.visibility} type="title">
                  {format(new Date(weatherInfo.sys.sunrise * 1000), 'HH:mm')}h
                </Texto>
                <View style={styles.flex}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={svgUrls.sunrise}
                    style={styles.buttonIcon}
                  />
                  <Texto type="p" color="dimgray">
                    Sunrise
                  </Texto>
                </View>
                <Texto style={styles.visibility} type="title">
                  {format(new Date(weatherInfo.sys.sunset * 1000), 'HH:mm')}h
                </Texto>
              </>
            }
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default City;

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
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  weatherImage: {
    width: 170,
    height: 100,
  },
  tempAndIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempBox: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonIn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 5,
    marginLeft: 5,
  },
  tempHourly: {
    height: 112,
  },
  visibility: {
    fontSize: 22,
    marginBottom: 10,
  },
  extraText: {},
  squareBlocks: {
    height: 170,
  },
});
