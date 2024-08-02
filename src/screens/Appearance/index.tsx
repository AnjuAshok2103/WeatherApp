import {useColorScheme, View} from 'react-native';
import React, {useState} from 'react';
import {List, RadioButton, useTheme} from 'react-native-paper';
import {AppearanceScreenProps} from '../../types';

const ListIcon = () => <List.Icon icon="tick" />;
const Appearance = (props: AppearanceScreenProps) => {
  const colorScheme = useColorScheme();
  const {colors} = useTheme();

  const [checked, setChecked] = useState(
    colorScheme === 'dark' ? 'dark' : 'light',
  );

  const handleThemeChange = value => {
    setChecked(value);
    // Apply theme change logic here
    // For example, if using a theme provider, update the theme context
  };

  const themeOptions = [
    {key: 'light', title: 'Light'},
    {key: 'dark', title: 'Dark'},
    {key: 'system', title: 'System Default'},
  ];
  return (
    <View>
      {themeOptions.map(option => (
        <List.Item
          key={option.key}
          title={option.title}
          left={() => ListIcon()}
        />
      ))}
    </View>
  );
};

export default Appearance;
