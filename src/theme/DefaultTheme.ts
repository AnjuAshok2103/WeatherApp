// theme.js
import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: '#ffffff',
    text: '#000000',
    // Add or override more colors as needed
  },
};

export default CombinedDefaultTheme;
