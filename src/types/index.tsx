import {RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import GooglePlacesInput from '../components/GooglePlacesInput';

export type RootStackParamsList = {
  MainScreen: undefined;
  Appearance: undefined;
  Details: {weatherData: WeatherData};
};

export type MainScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'MainScreen'
>;

export type AppearanceScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'Appearance'
>;

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'Details'
>;

export type TitleProps = {
  title: string;
};

export type Location = {
  latitude: number | undefined;
  longitude: number | undefined;
};

export type GooglePlacesData = {
  address: string;
  location: Location;
};

export type GooglePlacesProps = {
  onPress: (data: GooglePlacesData) => void;
};

export type AppTheme = 'DARK' | 'LIGHT' | 'SYSTEM';

export interface ThemeProps {
  isThemeDark: boolean;
  toggleTheme: (apptheme: AppTheme) => void;
  appTheme: AppTheme;
  theme: any;
}
// Weather
export interface WeatherData {
  title: string;
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  is_day: string;
  precipitation: string;
  weather_code: string;
  wind_speed_10m: string;
  surface_pressure: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
  relative_humidity_2m: string;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  is_day: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  surface_pressure: number;
  wind_direction_10m: number;
  wind_gusts_10m: string;
  relative_humidity_2m: number;
}

export interface HourlyUnits {
  time: string;
  weather_code: number;
  temperature_2m: string;
}

export interface Hourly {
  time: string[];
  weather_code: number[];
  temperature_2m: number[];
}

export interface DailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  sunrise: string;
  sunset: string;
  uv_index_max: string;
  uv_index_clear_sky_max: string;
}

export interface Daily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  uv_index_clear_sky_max: number[];
}

export interface DottedArcProps {
  radius: number;
  startAngle: number;
  endAngle: number;
  dotSize: number;
  dotSpacing: number;
  dotDegree: number;
}

export interface WindDirectionIconWithArcProps {
  direction: number;
}

export interface UVIndexDescription {
  level: string;
  info: string;
}

/**
 * Atmospheric pressure classification.
 */
export enum PressureCategory {
  Low = 'Low',
  Standard = 'Standard',
  High = 'High',
}

export enum AppThemeType {
  dark = 'DARK',
  light = 'LIGHT',
  system = 'SYSTEM',
}
export type MoreOptionsProps = {
  visible: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  navigation: NativeStackNavigationProp<RootStackParamsList, 'MainScreen'>;
  route: RouteProp<RootStackParamsList, 'MainScreen'>;
  colors: MD3Colors;
};

export type ItemProps = {index: number; item: WeatherData};

export type googlePlaceInputHandle = React.ElementRef<typeof GooglePlacesInput>;

export type AsyncKeyValue = {
  key: string;
  value: string;
};

export type LocalStorageProps = {
  saveString: ({key, value}: AsyncKeyValue) => Promise<boolean>;
  save: ({key, value}: AsyncKeyValue) => void;
  getFromAsyncStorage: (key: string) => Promise<string | null>;
  removeString: (key: string) => Promise<boolean>;
};
