import React, {useContext, useEffect, useState} from 'react';
import {useColorScheme, View} from 'react-native';
import {Divider, List, useTheme} from 'react-native-paper';
import {AppearanceScreenProps, AppTheme} from '../../types';
import {MyThemeContext} from '../../contexts/ThemeContext';

const ListIcon = (color: string) => <List.Icon icon="check" color={color} />;
const Appearance = (props: AppearanceScreenProps) => {
  const {appTheme, toggleTheme} = useContext(MyThemeContext);
  const {colors} = useTheme();

  const [themeOptions, setThemeOptions] = useState([
    {key: 'LIGHT', title: 'Light', checked: false},
    {key: 'DARK', title: 'Dark', checked: false},
    {key: 'SYSTEM', title: 'System Default', checked: true},
  ]);

  function toggleThemeLocal(key: string) {
    let themeOptionsA = themeOptions.map(option => ({
      ...option,
      checked: option.key === key,
    }));
    setThemeOptions(themeOptionsA);
    toggleTheme(key as AppTheme);
  }

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      {themeOptions.map((option, index) => (
        <View key={index}>
          <List.Item
            key={option.key}
            title={option.title}
            right={() => option.checked && ListIcon(colors.primary)}
            onPress={() => toggleThemeLocal(option.key)}
            titleStyle={{color: colors.primary}}
          />
          <Divider style={{backgroundColor: colors.primary}} />
        </View>
      ))}
    </View>
  );
};

export default Appearance;
