import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {NativeScrollEvent, NativeSyntheticEvent, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import GooglePlacesInput from '../components/GooglePlacesInput';
import Title from '../components/Title';
import {styles} from '../styles';
import {
  GooglePlacesData,
  Location,
  MainScreenProps,
  WeatherData,
} from '../types';
import moment from 'moment';

export default function MainScreen({navigation, route}: MainScreenProps) {
  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(event.nativeEvent.contentOffset.y);
    const {contentOffset} = event.nativeEvent;
    if (contentOffset.y >= 80) {
      navigation.setOptions({
        headerTitle: 'Weather',
      });
    } else {
      navigation.setOptions({
        headerTitle: '',
      });
    }
  };

  const callWeatherApi = async ({
    data,
    title,
  }: {
    data: Location;
    title: string;
  }) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current=relative_humidity_2m,weather_code,temperature_2m,is_day,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&hourly=weather_code,temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&forecast_days=10&timezone=auto`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        let jsonToSend: WeatherData = {
          title: title,
          ...json,
        };
        console.log('json', JSON.stringify(jsonToSend));

        navigation.navigate('Details', {weatherData: jsonToSend});
      })
      .catch(error => console.error(error));
  };

  function ReceiveGooglerPlacesData(data: GooglePlacesData) {
    //get lat lng and call weather api
    setTimeout(() => {
      if (data.location.latitude && data.location.longitude) {
        callWeatherApi({
          data: {
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          },
          title: data.address,
        });
      }
    }, 1500);
  }

  return (
    <ScrollView
      onScroll={scrollHandler}
      contentInsetAdjustmentBehavior="automatic"
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled">
      <View style={{...styles.containerFlex}}>
        <Title title="Weather" />
        <ScrollView
          contentContainerStyle={{
            display: 'flex',
            flexGrow: 1,
          }}
          horizontal
          keyboardShouldPersistTaps="handled">
          <View style={{marginHorizontal: 10, flex: 1}}>
            <GooglePlacesInput onPress={ReceiveGooglerPlacesData} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
