import React, {createContext, useState} from 'react';
import {AppTheme, AppThemeType, ThemeProps} from '../types';
import {PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {CombinedDarkTheme, CombinedDefaultTheme} from '../theme/theme';

export const MyThemeContext = createContext<ThemeProps>({
  isThemeDark: false,
  toggleTheme: () => {},
  appTheme: 'SYSTEM',
  theme: CombinedDefaultTheme,
});

interface ThemeInterface {
  children?: React.ReactNode;
}

export default function ThemeContextProvider(props: ThemeInterface) {
  const systemTheme = useColorScheme();
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [appTheme, setAppTheme] = useState<AppTheme>(AppThemeType.system);
  const [theme, setTheme] = useState(
    systemTheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme,
  );
  const toggleTheme = (key: string) => {
    console.log('key', key);
    setAppTheme(key as AppTheme);

    setIsThemeDark(
      key === 'DARK' || (key === 'SYSTEM' && systemTheme === 'dark'),
    );
    setTheme(
      key === 'DARK' || (key === 'SYSTEM' && systemTheme === 'dark')
        ? CombinedDarkTheme
        : CombinedDefaultTheme,
    );
  };

  return (
    <MyThemeContext.Provider
      value={{isThemeDark, appTheme, theme, toggleTheme}}>
      <PaperProvider theme={theme}>{props.children}</PaperProvider>
    </MyThemeContext.Provider>
  );
}
