/* eslint-disable react-native/no-inline-styles */
import React, {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../styles';
import {Current, CurrentUnits} from '../../types';
import {classifyPressure} from '../../utils';
import Gauge from '../Icons/Gauge';
import GaugeWrapper from '../Icons/Gauge';

const Pressure = ({
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
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Icon
            testID="WindDirectionIcon"
            name="gauge"
            size={20}
            color={colors.onSurface}
          />
          <Text style={{fontSize: 18}}>Pressure</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
          }}>
          <GaugeWrapper pressure={currentData.surface_pressure} />
          <Text>
            {classifyPressure(currentData.surface_pressure)}
            <Text
              style={{
                fontSize: 18,
              }}>{` ${currentData.surface_pressure} `}</Text>
            {`${currentUnits.surface_pressure}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Pressure;
