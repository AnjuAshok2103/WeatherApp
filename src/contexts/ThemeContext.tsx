import React, {createContext, useState} from 'react';
import {ThemeProps} from '../types';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {Appearance, useColorScheme} from 'react-native';
import {DarkTheme} from '@react-navigation/native';

export const MyThemeContext = createContext<ThemeProps>({
  isThemeDark: false,
  toggleTheme: () => {},
});

interface ThemeInterface {
  children?: React.ReactNode;
}

export default function ThemeContextProvider(props: ThemeInterface) {
  const colorScheme = useColorScheme();
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [theme, setTheme] = useState(
    colorScheme === 'dark' ? DarkTheme : DefaultTheme,
  );
  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <MyThemeContext.Provider value={preferences}>
      <PaperProvider theme={theme}>{props.children}</PaperProvider>
    </MyThemeContext.Provider>
  );
}
