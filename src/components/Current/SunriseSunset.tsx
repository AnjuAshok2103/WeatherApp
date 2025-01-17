/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
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
  const {colors} = useTheme();

  return (
    <View
      style={{
        ...styles.containerFlex,
        backgroundColor: colors.secondaryContainer,
        width: '100%',
        gap: 5,
        borderRadius: 5,
        padding: 15,
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
            testID="SunriseIcon"
            name="sunrise"
            size={20}
            color={colors.onSurface}
          />
          <Text style={{fontSize: 18}}>Sunrise & Sunset</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
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
    </View>
  );
};

export default SunriseSunset;
