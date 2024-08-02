/* eslint-disable react-native/no-inline-styles */
import React, {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {styles} from '../../styles';
import {Current, CurrentUnits, Daily} from '../../types';
import {formatDateTime} from '../../utils';
const SunriseSunset = ({
  dailyData,
}: {
  currentData: Current;
  currentUnits: CurrentUnits;
  dailyData: Daily;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
}) => {
  return (
    <View
      style={{
        ...styles.containerFlex,
        width: '100%',
        gap: 5,
        borderRadius: 5,
        padding: 15,
        backgroundColor: '#cecece',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Icon testID="HumidityIcon" name="sunrise" size={20} color="black" />
          <Text style={{fontSize: 18}}>Sunrise & Sunset</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            gap: 20,
          }}>
          <View style={{gap: 5}}>
            <Text>Sunrise</Text>
            <Text
              style={{
                fontSize: 16,
              }}>
              {formatDateTime({
                isoString: dailyData.sunrise[0],
                showMinutes: true,
              })}
            </Text>
          </View>
          <View style={{gap: 5}}>
            <Text>Sunset</Text>
            <Text
              style={{
                fontSize: 16,
              }}>
              {formatDateTime({
                isoString: dailyData.sunset[0],
                showMinutes: true,
              })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SunriseSunset;
