/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles';

interface HumidityCapsuleProps {
  humidity: number; // Humidity percentage (0-100)
}

const HumidityCapsule: React.FC<HumidityCapsuleProps> = ({humidity}) => {
  const capsuleWidth = 30;
  const capsuleHeight = 60;
  const fillHeight = (capsuleHeight * humidity) / 100;
  const topRadius = capsuleWidth / 3; // Radius for the rounded corners
  const iconSize = 10;

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animate = () => {
    height.value = withTiming(fillHeight, {duration: 1000});
    opacity.value = withTiming(1, {duration: 1000});
  };

  // Define animated styles using the shared values
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
    };
  });

  setTimeout(() => {
    animate();
  }, 800);

  return (
    <View
      style={[
        styles.capsuleContainer,
        {width: capsuleWidth, height: capsuleHeight},
      ]}>
      {/* Background Capsule */}
      <View
        style={[
          styles.backgroundCapsule,
          {
            width: capsuleWidth,
            height: capsuleHeight,
            borderRadius: capsuleWidth / 2,
            overflow: 'hidden',
          },
        ]}>
        {/* Filled Capsule */}
        <Animated.View
          style={[
            styles.capsuleFilled,
            {
              position: 'absolute',
              width: capsuleWidth,
              borderBottomLeftRadius: topRadius,
              borderBottomRightRadius: topRadius,
            },
            animatedStyle,
          ]}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: !Number.isNaN(fillHeight) ? fillHeight - iconSize / 2 : 0,
          left: -iconSize,
        }}>
        <Icon
          testID="WindDirectionIcon"
          name="caret-forward"
          size={iconSize}
          color="black"
        />
      </View>
    </View>
  );
};
const CapsuleWrapper = ({humidity}: {humidity: number}) => {
  return (
    <View style={{display: 'flex'}}>
      <Text style={{alignSelf: 'center', fontSize: 10}}>100</Text>
      <HumidityCapsule humidity={humidity} />
      <Text style={{alignSelf: 'center', fontSize: 10}}>0</Text>
    </View>
  );
};

export default CapsuleWrapper;
