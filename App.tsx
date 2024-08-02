/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import RootStackNavigator from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {styles} from './src/styles';
import ThemeContextProvider, {
  MyThemeContext,
} from './src/contexts/ThemeContext';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {theme} = useContext(MyThemeContext);

  return (
    <GestureHandlerRootView style={{...styles.containerFlex}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const AppWrapper = () => (
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);

export default AppWrapper;
