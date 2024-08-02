import {View, Text} from 'react-native';
import React from 'react';
import {TitleProps} from '../types';

const Title = ({title}: TitleProps) => {
  return (
    <View style={{margin: 10, padding: 5}}>
      <Text style={{fontWeight: 700, fontSize: 28}}>{title}</Text>
    </View>
  );
};

export default Title;
