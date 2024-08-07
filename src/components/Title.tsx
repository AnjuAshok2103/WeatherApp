import {View} from 'react-native';
import React from 'react';
import {TitleProps} from '../types';
import {Text, useTheme} from 'react-native-paper';

const Title = ({title}: TitleProps) => {
  const {colors} = useTheme();
  return (
    <View style={{margin: 10, padding: 5}}>
      <Text style={{fontWeight: 700, fontSize: 28}}>{title}</Text>
    </View>
  );
};

export default Title;
