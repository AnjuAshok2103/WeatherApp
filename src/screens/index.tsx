/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Icons from 'react-native-heroicons/outline';
import {Divider, IconButton, Menu, Text, useTheme} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import GooglePlacesInput from '../components/GooglePlacesInput';
import Title from '../components/Title';
import {MyThemeContext} from '../contexts/ThemeContext';
import useKeyboardVisible from '../customHook/useKeyboardVisible';
import {removeWeatherData} from '../redux/features/weather/weatherSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {styles} from '../styles';
import {
  googlePlaceInputHandle,
  GooglePlacesData,
  ItemProps,
  Location,
  MainScreenProps,
  WeatherData,
} from '../types';
import {
  formatDateTime,
  getFirstWord,
  getWeatherDescription,
  roundTemperature,
} from '../utils';

export default function MainScreen({navigation, route}: MainScreenProps) {
  const googlePlaceInputRef = useRef<googlePlaceInputHandle>(null); //google places ref
  const isKeyboardVisible = useKeyboardVisible(); //custom hook
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector(state => state.weather.weatherData);
  const {colors} = useTheme();
  const {appTheme, theme, toggleTheme} = useContext(MyThemeContext);

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  // eslint-disable-next-line react/no-unstable-nested-components
  const MoreMenu = () => (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition="bottom"
      anchor={
        <TouchableOpacity
          onPress={() => openMenu()}
          style={styles.padding5AlignC}>
          <Icons.EllipsisHorizontalCircleIcon
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
      }>
      <Menu.Item
        onPress={() => {
          closeMenu();
        }}
        title="Edit"
        leadingIcon={'pencil-outline'}
      />
      <Divider />
      <Menu.Item
        onPress={() => {}}
        title="Celcius"
        leadingIcon={'temperature-celsius'}
      />
      <Divider />
      <Menu.Item
        onPress={() => {}}
        title="Fahrenheit"
        leadingIcon={'temperature-fahrenheit'}
      />
      <Menu.Item
        onPress={() => {
          closeMenu();
          navigation.navigate('Appearance');
        }}
        title="Theme"
        leadingIcon={'theme-light-dark'}
      />
    </Menu>
  );

  const handleRemoveWeatherData = (index: number) => {
    dispatch(removeWeatherData({index: index}));
  };

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = event.nativeEvent;
    if (contentOffset.y >= 80) {
      navigation.setOptions({
        headerTitle: 'Weather',
        headerTintColor: colors.primary,
      });
    } else {
      navigation.setOptions({
        headerTitle: '',
        headerTintColor: colors.primary,
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: MoreMenu,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, visible]);

  useEffect(() => {}, []);

  const Item = ({item, index}: ItemProps) => (
    <TouchableOpacity
      style={{
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: colors.secondaryContainer,
        padding: 10,
        gap: 15,
      }}
      onPress={() =>
        navigation.navigate('Details', {weatherData: weatherData[index]})
      }>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <View style={{gap: 4}}>
          <Text style={{fontSize: 16}}>{getFirstWord(item.title)}</Text>
          <Text style={{fontSize: 14}}>
            {formatDateTime({
              isoString: item.current.time,
              showMinutes: true,
            })}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 24,
            }}>{`${item.current.temperature_2m}\u00B0`}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <Text>{getWeatherDescription(item.current.weather_code)}</Text>
        <View style={{alignItems: 'center'}}>
          <Text>{`H:${roundTemperature(
            item.daily.temperature_2m_max[0],
          )}\u00B0 L:${roundTemperature(
            item.daily.temperature_2m_min[0],
          )}\u00B0`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        ...styles.containerFlex,
        backgroundColor: colors.background,
      }}>
      <SwipeListView
        onScroll={scrollHandler}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View style={{flex: 1, padding: 10}}>
            <Title title="Weather" />
            <GooglePlacesInput
              ref={googlePlaceInputRef}
              onPress={ReceiveGooglerPlacesData}
            />
          </View>
        }
        data={weatherData}
        renderItem={({item, index}) =>
          !isKeyboardVisible ? <Item item={item} index={index} /> : <View />
        }
        renderHiddenItem={({item, index}) =>
          !isKeyboardVisible ? (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: 'red',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 15,
                borderRadius: 10,
                margin: 10,
              }}
              activeOpacity={0.7}>
              <View>
                <IconButton
                  icon="trash-can"
                  size={30}
                  iconColor={colors.primary}
                  onPress={() => handleRemoveWeatherData(index)}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <View />
          )
        }
        rightOpenValue={-Dimensions.get('screen').width}
        keyExtractor={item => item.title}
        onSwipeValueChange={({key, value}) => {
          if (value < -Dimensions.get('screen').width) {
            handleRemoveWeatherData(
              weatherData.findIndex(item => item.title.includes(key)),
            );
          }
        }}
      />
    </View>
  );
}
