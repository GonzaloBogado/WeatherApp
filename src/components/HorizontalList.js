// @flow
import {StyleSheet, Text, FlatList} from 'react-native';
import React from 'react';

interface Props {
  data: any[];
  //dont know how to avoid this any, since the data we need to render
  //the element could be anything
  component: React$Element<any>;
  [key: string]: any;
  //to recieve props from specific component, we dont know
  //this props are so I should leave it as any

  //
}

const HorizontalList = ({
  data,
  component: Component,
  ...rest
}: Props): React$Element<any> => {
  return <FlatList horizontal={true} data={data} />;
};

export default HorizontalList;

const styles = StyleSheet.create({});
