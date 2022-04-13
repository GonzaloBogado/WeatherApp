// @flow

import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';

interface Props {
  content: any;
}

const Button = ({content}: Props): React$Element<any> => {
  return (
    <Pressable style={styles.button}>
      <>{content}</>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    marginVertical: 14,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 1,
  },
  container: {
    margin: 10,
  },
});
