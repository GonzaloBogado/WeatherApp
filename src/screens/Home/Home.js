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
import moment from 'moment-timezone';
import {useEffect, useState} from 'react';
import useAxios from '../../hooks/useAxios';
import Texto from '../../components/UI/Texto';
import {fromUnixTime, format, getHours} from 'date-fns';
import StatusAndIcon from './StatusAndIcon';
import {OPENWEATHERKEY} from 'react-native-dotenv';
const {zonedTimeToUtc, utcToZonedTime} = require('date-fns-tz');
import COLORS from '../../constants/colors';
import svgUrls from '../../constants/svgUrls';
import {useRoute} from '@react-navigation/native';

import Button from '../../components/UI/Button';
import {SvgUri} from 'react-native-svg';
import HourlyInfoBlock from './HourlyInfoBlock';
import InfoSquare from '../../components/UI/InfoSquare';
import {useNavigation} from '@react-navigation/native';

interface Props {
  userPosition: {
    lat: string,
    lon: string,
  };
}

const City = ({
  userPosition: userPositionLocation,
}: Props): React$Element<any> => {
  const route = useRoute();
  const userPosition = route.params
    ? route.params.userPosition
    : userPositionLocation;
  const [date, setDate] = useState(new Date());
  const [position, setPosition] = useState({});
  const today = new Date();
  const apiKey = OPENWEATHERKEY;
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
        <Texto type="title" color={COLORS.main}>
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
  const offset: string = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const zonedDate = utcToZonedTime(
    new Date(weatherInfo.sys.sunrise * 1000 + weatherInfo.timezone / 60),
    offset,
  );
  const sunrise = moment(weatherInfo.sys.sunrise * 1000)
    .utcOffset(weatherInfo.timezone / 60)
    .format('HH:MM');
  const sunset = moment(weatherInfo.sys.sunset * 1000)
    .utcOffset(weatherInfo.timezone / 60)
    .format('HH:MM');

  return (
    <View style={styles.container}>
      <Texto type="p">Today, {format(today, 'do MMMM')}</Texto>
      <Texto type="title">{userPosition.name || weatherInfo.name}</Texto>
      <Texto type="p" color={COLORS.secondary}>
        {weatherInfo.weather[0].main}, {weatherInfo.weather[0].description}
      </Texto>
      <Image
        style={styles.weatherImage}
        source={{
          uri: `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`,
        }}
      />
      <View style={styles.tempAndIcons}>
        <StatusAndIcon
          svg={svgUrls.rain}
          text={`${pop} %`}
          color={COLORS.secondary}
        />
        <View style={styles.tempBox}>
          <Texto type="temp">{Math.round(temp)}°</Texto>
          <Texto type="p" color={COLORS.secondary}>
            {' '}
            Feels like: {Math.round(feelsLike)}°
          </Texto>
          <Texto type="p" color={COLORS.secondary}>
            Min: {Math.round(tempMin)}° Max: {Math.round(tempMax)}°
          </Texto>
        </View>
        <StatusAndIcon
          svg={svgUrls.wind}
          text={`${Math.round(windSpeed)} km/h`}
          color={COLORS.secondary}
        />
      </View>
      <Button
        content={
          <Pressable
            style={styles.buttonIn}
            onPress={() =>
              navigation.navigate('DailyForecasts', {
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
            <HourlyInfoBlock
              hour={moment(item.dt * 1000)
                .utcOffset(weatherInfo.timezone / 60)
                .format('HH')}
              temp={Math.round(item.temp)}
              icon={item.weather[0].icon}
              index={index}
              //dont know how to
            />
          )}
        />
      </View>
      <View style={styles.squareBlocks}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                  <Texto type="p" color={COLORS.secondary}>
                    Visibility
                  </Texto>
                </View>
                <Texto style={styles.visibility} type="title">
                  {Math.round(weatherInfo.visibility / 1000)} km
                </Texto>
                <View style={styles.extraText}>
                  <Texto type="p" color={COLORS.secondary}>
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
                  <Texto type="p" color={COLORS.secondary}>
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
                  <Texto type="p" color={COLORS.secondary}>
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
                  <Texto type="p" color={COLORS.secondary}>
                    Sunrise
                  </Texto>
                </View>
                <Texto style={styles.visibility} type="title">
                  {sunrise}h
                </Texto>
                <View style={styles.flex}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={svgUrls.sunrise}
                    style={styles.buttonIcon}
                  />
                  <Texto type="p" color={COLORS.secondary}>
                    Sunrise
                  </Texto>
                </View>
                <Texto style={styles.visibility} type="title">
                  {sunset}h
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
    backgroundColor: COLORS.background,
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
