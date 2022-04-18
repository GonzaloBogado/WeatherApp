// @flow

import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Texto from '../../components/UI/Texto';
interface Props {
  day: string;
  icon: string;
  maxTemp: number;
  minTemp: number;
  index: number;
}
import {SvgUri} from 'react-native-svg';
import svgUrls from '../../constants/svgUrls';
import COLORS from '../../constants/colors';

const Daily = ({
  day,
  icon,
  maxTemp,
  minTemp,
  index,
}: Props): React$Element<any> => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: 270,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
      borderBottomWidth: index === 7 ? 0 : 1,
      paddingVertical: 5,
      paddingHorizontal: 0,
    },
    dayText: {
      width: 85,
      fontWeight: index === 0 ? '600' : '300',
      color: index === 0 ? COLORS.main : COLORS.secondary,
    },
    tempText: {
      width: 60,
      textAlign: 'right',
      fontWeight: index === 0 ? '600' : '300',
      color: index === 0 ? COLORS.main : COLORS.secondary,
    },
    weatherImage: {
      width: 40,
      height: 30,
    },
  });
  return (
    <View style={styles.container}>
      <Texto type="p" style={styles.dayText}>
        {day}
      </Texto>
      <Image
        style={styles.weatherImage}
        source={{
          uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        }}
      />
      <Texto
        type="p"
        style={styles.tempText}>{`${minTemp}°/${maxTemp}°`}</Texto>
    </View>
  );
};

export default Daily;
