/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {removeWeatherData} from '../features/weather/weatherSlice';
import {Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import useKeyboardVisible from '../customHook/useKeyboardVisible';

type googlePlaceInputHandle = React.ElementRef<typeof GooglePlacesInput>;

export default function MainScreen({navigation, route}: MainScreenProps) {
  const googlePlaceInputRef = useRef<googlePlaceInputHandle>(null);

  const isKeyboardVisible = useKeyboardVisible();
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector(state => state.weather.weatherData);

  const handleRemoveWeatherData = (index: number) => {
    dispatch(removeWeatherData({index: index}));
  };

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
        console.log('json', JSON.stringify(jsonToSend.title));

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

  type ItemProps = {index: number; title: string};

  const Item = ({title, index}: ItemProps) => (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
      }}
      key={title}
      onPress={() =>
        navigation.navigate('Details', {weatherData: weatherData[index]})
      }>
      <Text>{title}</Text>
      <TouchableOpacity onPress={() => handleRemoveWeatherData(index)}>
        <Icon testID="TrashIcon" name="trash-2" size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  useFocusEffect(
    React.useCallback(() => {
      googlePlaceInputRef?.current?.focusAndClear();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route]),
  );
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
            flexDirection: 'column',
            gap: 20,
            paddingHorizontal: 10,
          }}
          horizontal
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              flex: 1,
            }}>
            <GooglePlacesInput
              ref={googlePlaceInputRef}
              onPress={ReceiveGooglerPlacesData}
            />
          </View>
          {!isKeyboardVisible && (
            <View
              style={{
                flex: 1,
              }}>
              <FlatList
                data={weatherData}
                renderItem={({item, index}) => (
                  <Item title={item.title} index={index} />
                )}
                keyExtractor={item => item.title}
                ItemSeparatorComponent={() => <Divider />}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
