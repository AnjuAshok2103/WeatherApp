import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MainScreen from '../screens';
import {RootStackParamsList} from '../types';
import {TouchableOpacity, useColorScheme} from 'react-native';
import * as Icons from 'react-native-heroicons/outline';
import {Divider, Menu} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {styles} from '../styles';
import Appearance from '../screens/Appearance';
import Details from '../screens/Details';

type MoreOptionsProps = {
  visible: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  navigation: NativeStackNavigationProp<RootStackParamsList, 'MainScreen'>;
  route: RouteProp<RootStackParamsList, 'MainScreen'>;
};
const MoreMenu = (props: MoreOptionsProps) => {
  const {visible, closeMenu, openMenu} = props;
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition="bottom"
      anchor={
        <TouchableOpacity onPress={openMenu} style={styles.padding5AlignC}>
          <Icons.EllipsisHorizontalCircleIcon size={25} color={'blue'} />
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
    </Menu>
  );
};

const RootStack = createNativeStackNavigator<RootStackParamsList>();
const RootStackNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={({navigation, route}) => ({
          headerTintColor: 'red',
          headerRight: () =>
            MoreMenu({visible, closeMenu, openMenu, navigation, route}),
          headerStyle: {
            // backgroundColor: 'black',
          },
        })}
      />
      <RootStack.Screen
        name="Appearance"
        component={Appearance}
        options={({navigation, route}) => ({
          title: '',
        })}
      />
      <RootStack.Screen
        name="Details"
        component={Details}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
