// @flow
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
interface Props {
  type: 'title' | 'p' | 'temp';
  color?: string;
  children?: any;
  noMargin?: boolean;
  style?: Object;
}

const Texto = ({
  type,
  color,
  children,
  noMargin,
  style,
}: Props): React$Element<any> => {
  const styles = StyleSheet.create({
    text: {
      fontSize: type === 'title' ? 30 : type === 'temp' ? 55 : 15,
      color: color || 'black',
      fontWeight: type === 'p' ? '300' : '600',
      marginBottom: noMargin ? 0 : 5,
      ...style,
    },
  });

  return <Text style={styles.text}>{children}</Text>;
};

export default Texto;
