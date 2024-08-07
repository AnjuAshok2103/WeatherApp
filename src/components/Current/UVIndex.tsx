/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Fontisto';
import {styles} from '../../styles';
import {Current, CurrentUnits, Daily} from '../../types';
import {getUVLevelInfo, getUVLevelInfoText} from '../../utils';
import SunWrapper from '../Icons/SunAnimation';

const UVIndex = ({
  currentData,
  currentUnits,
  dailyData,
}: {
  currentData: Current;
  currentUnits: CurrentUnits;
  dailyData: Daily;
}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        ...styles.cardStyle,
        backgroundColor: colors.secondaryContainer,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Icon
            testID="HumidityIcon"
            name="sun"
            size={20}
            color={colors.onSurface}
          />
          <Text style={{fontSize: 18}}>UV Index</Text>
        </View>
        <View
          style={{flexDirection: 'row', flex: 1, alignItems: 'center', gap: 5}}>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
            }}>
            <View style={{gap: 5}}>
              <Text
                style={{
                  fontSize: 18,
                }}>
                {Math.round(dailyData.uv_index_max[0])}
              </Text>
              <Text>
                {getUVLevelInfo(Math.round(dailyData.uv_index_max[0]))}
              </Text>
            </View>
            {Math.round(dailyData.uv_index_max[0]) > 7 && (
              <View>
                <Text>
                  {getUVLevelInfoText(Math.round(dailyData.uv_index_max[0]))}
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              flex: 1,
            }}>
            <SunWrapper uvIndex={Math.round(dailyData.uv_index_max[0])} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UVIndex;
