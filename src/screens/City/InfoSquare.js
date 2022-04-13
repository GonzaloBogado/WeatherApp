// @flow

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
interface Props {
  content: any;
}

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
    height: 130,
    width: 130,
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 34,
    borderWidth: 2,
    padding: 10,
    margin: 10,
  },
});
