/* eslint-disable react/react-in-jsx-scope */
import {
  addDays,
  format,
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
} from 'date-fns';
import {isSameHour} from 'date-fns/isSameHour';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../styles';
import {Hourly} from '../../types';
import {getIconName} from '../../utils';

const HourlyWeatherCard = ({
  hourlyData,
  currentTime,
}: {
  hourlyData: Hourly;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  currentTime: string;
  timezone_abbreviation: string;
}) => {
  const {colors} = useTheme();
  const filteredData: Hourly = {
    time: [],
    temperature_2m: [],
    weather_code: [],
  };
  let timeISOStringArray: string[] = [];
  const currentTimeParsed = parseISO(currentTime);
  const endTime = addDays(startOfDay(currentTime), 1);
  endTime.setHours(currentTimeParsed.getHours());
  endTime.setMinutes(currentTimeParsed.getMinutes());

  let data = hourlyData.time;
  for (let i = 0; i < data.length; i++) {
    const timeParsed = parseISO(data[i]);
    if (
      (isAfter(timeParsed, currentTime) && isBefore(timeParsed, endTime)) ||
      isSameHour(timeParsed, currentTime)
    ) {
      timeISOStringArray.push(data[i]);
      filteredData.time.push(format(timeParsed, 'h a'));
      filteredData.temperature_2m.push(hourlyData.temperature_2m[i]);
      filteredData.weather_code.push(hourlyData.weather_code[i]);
    }
  }

  console.log('f', JSON.stringify(filteredData));

  return (
    <View
      style={{
        ...styles.displayFlexCenter,
        ...styles.borderRadius5,
        backgroundColor: colors.secondaryContainer,
      }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredData.time.map((item, index) => {
          return (
            <View
              key={`${item}${index}`}
              style={{
                ...styles.displayFlexCenter,
                ...styles.hourlyItem,
              }}>
              <Text>{item}</Text>

              <Icon
                testID="HourlyIcon"
                name={getIconName({
                  weatherCode: filteredData.weather_code[index],
                  isoString: timeISOStringArray[index],
                })}
                size={30}
                color={colors.onSurface}
              />

              <Text> {`${filteredData.temperature_2m[index]}\u00B0`}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HourlyWeatherCard;
