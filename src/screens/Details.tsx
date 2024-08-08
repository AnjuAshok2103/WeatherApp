/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CurrentWeatherData from '../components/Current';
import DailyWeatherData from '../components/Daily';
import HourlyWeatherCard from '../components/Hourly';
import {styles} from '../styles';
import {DetailsScreenProps, WeatherData} from '../types';
import {getFirstWord, getWeatherDescription} from '../utils';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addWeatherData} from '../redux/features/weather/weatherSlice';

export const weatherDataInitial = {
  title: '',
  latitude: 0,
  longitude: 0,
  generationtime_ms: 0,
  utc_offset_seconds: 0,
  timezone: '',
  timezone_abbreviation: '',
  elevation: 0,
  current_units: {
    time: '',
    interval: '',
    temperature_2m: '',
    is_day: '',
    precipitation: '',
    weather_code: '',
    wind_speed_10m: '',
    surface_pressure: '',
    wind_direction_10m: '',
    wind_gusts_10m: '',
    relative_humidity_2m: '',
  },
  current: {
    time: '',
    interval: 0,
    temperature_2m: 0,
    is_day: 0,
    precipitation: 0,
    weather_code: 0,
    wind_speed_10m: 0,
    surface_pressure: 0,
    wind_direction_10m: 0,
    wind_gusts_10m: '',
    relative_humidity_2m: 0,
  },
  hourly_units: {
    time: '',
    weather_code: 0,
    temperature_2m: '',
  },
  hourly: {
    time: [],
    temperature_2m: [],
    weather_code: [],
  },
  daily_units: {
    time: '',
    weather_code: '',
    sunset: '',
    sunrise: '',
    temperature_2m_max: '',
    temperature_2m_min: '',
    uv_index_max: '',
    uv_index_clear_sky_max: '',
  },
  daily: {
    time: [],
    weather_code: [],
    sunset: [],
    sunrise: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
    uv_index_max: [],
    uv_index_clear_sky_max: [],
  },
};
const Details = ({navigation, route}: DetailsScreenProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    ...weatherDataInitial,
  });
  const weatherDataInStore: WeatherData[] = useAppSelector(
    state => state.weather.weatherData,
  );
  const dispatch = useAppDispatch();

  const handleAddWeatherData = (data: WeatherData) => {
    dispatch(addWeatherData(data));
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  useEffect(() => {
    if (route.params) {
      let weatherData: WeatherData = route.params.weatherData;
      if (weatherData) {
        setWeatherData(weatherData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  return (
    <SafeAreaView
      style={{
        ...styles.containerFlex,
        ...styles.gap10,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 16}}>Cancel</Text>
        </TouchableOpacity>
        {weatherDataInStore.findIndex(
          item => weatherData.title === item.title,
        ) === -1 && (
          <TouchableOpacity onPress={() => handleAddWeatherData(weatherData)}>
            <Text style={{fontSize: 16}}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        <View
          style={{
            ...styles.displayFlexCenter,
          }}>
          <Text variant="headlineLarge">{getFirstWord(weatherData.title)}</Text>
          <Text variant="displayLarge">{`${weatherData.current.temperature_2m} ${weatherData.current_units.temperature_2m}`}</Text>
          <Text variant="headlineSmall">
            {getWeatherDescription(weatherData.current.weather_code)}
          </Text>
        </View>
        <View
          style={{
            ...styles.displayFlexWrapRow,
            ...styles.paddingHorizonatl15,
            ...styles.gap10,
            ...styles.paddingVertical5,
          }}>
          <Text>Hourly Forecast</Text>
          <HourlyWeatherCard
            hourlyData={weatherData.hourly}
            timezone={weatherData.timezone}
            utc_offset_seconds={weatherData.utc_offset_seconds}
            generationtime_ms={weatherData.generationtime_ms}
            currentTime={weatherData.current.time}
            timezone_abbreviation={weatherData.timezone_abbreviation}
          />
        </View>
        <View
          style={{
            ...styles.containerFlex,
            ...styles.displayFlexWrap,
            ...styles.paddingHorizonatl15,
            ...styles.paddingVertical5,
            ...styles.gap10,
          }}>
          <Text>{`${weatherData.daily.time.length}-day Forecast`}</Text>
          <DailyWeatherData dailyData={weatherData.daily} />
        </View>
        <View
          style={{
            ...styles.displayFlexWrap,
            ...styles.paddingHorizonatl15,
            ...styles.paddingVertical5,
            ...styles.gap10,
          }}>
          <Text>Current Conditions</Text>
          <CurrentWeatherData
            generationtime_ms={weatherData.generationtime_ms}
            utc_offset_seconds={weatherData.utc_offset_seconds}
            timezone={weatherData.timezone}
            currentData={weatherData.current}
            dailyData={weatherData.daily}
            currentUnits={weatherData.current_units}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
