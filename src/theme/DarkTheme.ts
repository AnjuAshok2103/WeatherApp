// darkTheme.js
import {MD3DarkTheme as PaperDarkTheme} from 'react-native-paper';
import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#BB86FC',
    accent: '#03DAC6',
    background: '#121212',
    surface: '#121212',
    text: '#FFFFFF',
    // Add or override more colors as needed
  },
};

export default CombinedDarkTheme;
