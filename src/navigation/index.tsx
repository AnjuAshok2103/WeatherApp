/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';
import MainScreen from '../screens';
import Appearance from '../screens/Appearance';
import Details from '../screens/Details';
import {RootStackParamsList} from '../types';

const RootStack = createNativeStackNavigator<RootStackParamsList>();
const RootStackNavigator = () => {
  const {colors} = useTheme();

  return (
    <RootStack.Navigator
      screenOptions={({navigation, route}) => ({
        headerStyle: {
          backgroundColor: colors.background,
        },
      })}>
      <RootStack.Screen name="MainScreen" component={MainScreen} />
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
