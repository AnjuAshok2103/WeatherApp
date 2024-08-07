/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import {styles} from '../../styles';
import {Current, CurrentUnits, Daily} from '../../types';
import WindCard from './WindCard';
import Humidity from './Humidity';
import UVIndex from './UVIndex';
import SunriseSunset from './SunriseSunset';
import Pressure from './Pressure';

const CurrentWeatherData = ({
  currentData,
  dailyData,
  currentUnits,
  generationtime_ms,
  utc_offset_seconds,
  timezone,
}: {
  currentData: Current;
  dailyData: Daily;
  currentUnits: CurrentUnits;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  return (
    <View
      style={{
        justifyContent: 'space-around',
        flex: 1,
        gap: 10,
        marginHorizontal: 5,
      }}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <WindCard currentData={currentData} currentUnits={currentUnits} />
        <Humidity currentData={currentData} currentUnits={currentUnits} />
      </View>
      <View style={{flexDirection: 'row', gap: 10}}>
        <UVIndex
          currentData={currentData}
          currentUnits={currentUnits}
          dailyData={dailyData}
        />
        <Pressure currentData={currentData} currentUnits={currentUnits} />
      </View>
      <View style={{flex: 1}}>
        <SunriseSunset
          currentData={currentData}
          currentUnits={currentUnits}
          dailyData={dailyData}
          generationtime_ms={generationtime_ms}
          utc_offset_seconds={utc_offset_seconds}
          timezone={timezone}
        />
      </View>
    </View>
  );
};

export default CurrentWeatherData;
