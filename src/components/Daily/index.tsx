import {View} from 'react-native';
import React from 'react';
import {Daily} from '../../types';
import {FlatList} from 'react-native';
import {styles} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getDate,
  getDayName,
  getIconName,
  getMonthName,
  roundTemperature,
} from '../../utils';
import {Text, useTheme} from 'react-native-paper';

const DailyWeatherData = ({dailyData}: {dailyData: Daily}) => {
  const {colors} = useTheme();
  const dailyDataFormatted = dailyData.time.map((time, index) => ({
    time,
    weather_code: dailyData.weather_code[index],
    temperature_2m_max: dailyData.temperature_2m_max[index],
    temperature_2m_min: dailyData.temperature_2m_min[index],
    sunrise: dailyData.sunrise[index],
    sunset: dailyData.sunset[index],
  }));

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          ...styles.flexDRow,
          ...styles.alignItemCenter,
          ...styles.gap10,
          backgroundColor: colors.secondaryContainer,
          ...styles.marginVertical5,
          ...styles.borderRadius5,
          ...styles.paddingVertical5,
          ...styles.paddingHorizonatl10,
        }}>
        <View style={{...styles.containerFlex}}>
          <Text>{`${getDayName(item.time)}, ${getMonthName(
            item.time,
          )} ${getDate(item.time)}`}</Text>
        </View>
        <View
          style={{
            ...styles.containerFlex,
            ...styles.alignItemCenter,
          }}>
          <Icon
            testID="DailyIcon"
            name={getIconName({
              weatherCode: item.weather_code,
              isoString: item.time,
            })}
            size={30}
            color={colors.onSurface}
          />
        </View>
        <View style={{...styles.containerFlex, ...styles.alignItemEnd}}>
          <Text>{`${roundTemperature(
            item.temperature_2m_max,
          )}° / ${roundTemperature(item.temperature_2m_min)}°`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.containerFlex,
        ...styles.width100,
      }}>
      {dailyDataFormatted && (
        <FlatList
          data={dailyDataFormatted}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default DailyWeatherData;
