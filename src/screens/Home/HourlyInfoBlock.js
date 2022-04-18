// @flow

import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Texto from '../../components/UI/Texto';
import COLORS from '../../constants/colors';
interface Props {
  hour: number;
  temp: number;
  icon: string;
  index: number;
}

const HourlyInfoBlock = ({
  hour,
  temp,
  icon,
  index,
}: Props): React$Element<any> => {
  return (
    <View style={styles.container}>
      <Texto noMargin type="p" color={COLORS.secondary}>
        {index === 0 ? 'Now' : `${hour}h`}
      </Texto>
      <Image
        style={styles.weatherImage}
        source={{
          uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        }}
      />
      <Texto noMargin type="p" color={COLORS.secondary}>
        {temp}°
      </Texto>
    </View>
  );
};

export default HourlyInfoBlock;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 100,
    margin: 6,
    marginHorizontal: 8,
  },
  weatherImage: {
    width: 50,
    height: 50,
  },
});
