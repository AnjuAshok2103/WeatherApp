/* eslint-disable react-native/no-inline-styles */
import React, {View} from 'react-native';
import {Divider, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {styles} from '../../styles';
import {Current, CurrentUnits} from '../../types';
import {getWindDirection} from '../../utils';

const WindCard = ({
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
            testID="WindDirectionIcon"
            name="wind"
            size={20}
            color={colors.onSurface}
          />
          <Text style={{fontSize: 18}}>Wind</Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            gap: 5,
          }}>
          <View>
            <Text>
              Wind
              <Text
                style={{
                  fontSize: 18,
                }}>{` ${currentData.wind_speed_10m} `}</Text>
              {`${currentUnits.wind_speed_10m}`}
            </Text>
          </View>
          <Divider style={{backgroundColor: 'gray'}} />
          <View>
            <Text>
              Gust
              <Text
                style={{
                  fontSize: 18,
                }}>{` ${currentData.wind_gusts_10m} `}</Text>
              {`${currentUnits.wind_speed_10m}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WindCard;
