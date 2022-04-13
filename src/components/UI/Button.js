// @flow

import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';

interface Props {
  content: any;
}

const Button = ({content}: Props): React$Element<any> => {
  return <Pressable style={styles.button}>{content}</Pressable>;
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginVertical: 12,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'dimgray',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  container: {
    margin: 10,
  },
});
