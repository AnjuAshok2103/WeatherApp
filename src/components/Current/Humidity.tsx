/* eslint-disable react-native/no-inline-styles */
import React, {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../styles';
import {Current, CurrentUnits} from '../../types';
import {calculateDewPoint} from '../../utils';
import CapsuleWrapper from '../Icons/HumidityCapsule';

const Humidity = ({
  currentData,
  currentUnits,
}: {
  currentData: Current;
  currentUnits: CurrentUnits;
}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        ...styles.cardStyle,
        backgroundColor: colors.secondaryContainer,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}>
          <Icon
            testID="HumidityIcon"
            name="air-humidifier"
            size={20}
            color={colors.onSurface}
          />
          <Text style={{fontSize: 18}}>Humidity</Text>
        </View>
        <View
          style={{flexDirection: 'row', flex: 1, alignItems: 'center', gap: 5}}>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
              }}>
              {`${currentData.relative_humidity_2m} ${currentUnits.relative_humidity_2m}`}
            </Text>

            <Text>
              {`Dew point at ${calculateDewPoint(
                currentData.temperature_2m,
                currentData.relative_humidity_2m,
              ).toFixed(2)}\u00B0`}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <CapsuleWrapper humidity={currentData.relative_humidity_2m} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Humidity;
