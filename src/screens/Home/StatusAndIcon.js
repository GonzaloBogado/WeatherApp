// @flow

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {SvgUri} from 'react-native-svg';
import Texto from '../../components/UI/Texto';
interface Props {
  svg: string;
  text: string;
  color?: string;
}

const StatusAndIcon = ({svg, text, color}: Props): React$Element<any> => {
  return (
    <>
      <View style={styles.container}>
        <SvgUri width="35" height="35" uri={svg} style={styles.image} />
        <Texto type="p" color={color}>
          {text}
        </Texto>
      </View>
    </>
  );
};

export default StatusAndIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minWidth: 90,
  },
  image: {
    marginBottom: 7,
  },
  text: {},
});
