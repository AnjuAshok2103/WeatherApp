import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  roundness: 5,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
export const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  dark: true,
  roundness: 5,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};
