import React, {View} from 'react-native';
import {Hourly} from '../../types';
import Icon from 'react-native-vector-icons/Fontisto';
import {styles} from '../../styles';
import {
  filterWeatherDataFromNow,
  formatDateTime,
  getIconName,
} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';

const HourlyWeatherCard = ({
  hourlyData,
  currentTime,
}: {
  hourlyData: Hourly;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  currentTime: string;
}) => {
  const {colors} = useTheme();
  const filtered: Hourly = filterWeatherDataFromNow({
    data: hourlyData,
    isoStringNow: currentTime,
  });

  return (
    <View
      style={{
        ...styles.displayFlexCenter,
        ...styles.borderRadius5,
        backgroundColor: colors.secondaryContainer,
      }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filtered.time.map((item, index) => {
          return (
            <View
              key={`${item}${index}`}
              style={{
                ...styles.displayFlexCenter,
                ...styles.hourlyItem,
              }}>
              <Text>
                {formatDateTime({
                  isoString: item,
                })}
              </Text>

              <Icon
                testID="HourlyIcon"
                name={getIconName({
                  weatherCode: hourlyData.weather_code[index],
                  isoString: item,
                })}
                size={30}
                color={colors.onSurface}
              />

              <Text> {`${hourlyData.temperature_2m[index]}\u00B0`}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HourlyWeatherCard;
