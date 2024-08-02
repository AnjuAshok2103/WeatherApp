/* eslint-disable react-native/no-inline-styles */
import React, {View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../styles';
import {Current, CurrentUnits} from '../../types';
import {classifyPressure} from '../../utils';

const Pressure = ({
  currentData,
  currentUnits,
}: {
  currentData: Current;
  currentUnits: CurrentUnits;
}) => {
  return (
    <View
      style={{
        ...styles.cardStyle,
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
            color="black"
          />
          <Text style={{fontSize: 18}}>Pressure</Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            gap: 5,
          }}>
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
