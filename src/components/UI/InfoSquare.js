// @flow

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
interface Props {
  content: React$Element<any>;
}
import COLORS from '../../constants/colors';
const InfoSquare = ({content}: Props): React$Element<any> => {
  return (
    <View style={styles.container}>
      <Text>{content}</Text>
    </View>
  );
};

export default InfoSquare;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    height: 130,
    width: 130,
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 34,
    padding: 10,
    margin: 10,
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
