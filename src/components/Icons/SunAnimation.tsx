/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {getUVColor} from '../../utils';

interface SunAnimationProps {
  uvIndex: number; // UV Index value (0-11)
}

const SunAnimation: React.FC<SunAnimationProps> = ({uvIndex = 1}) => {
  const circleSize = 40;
  const maxUVIndex = 11;
  const fillHeight = (circleSize / 11) * uvIndex;
  const bottomRadius = circleSize / 2; // Radius for the rounded corners
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const iconSize = 10;
  const {colors} = useTheme();

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
        {
          width: circleSize,
          height: circleSize,
        },
      ]}>
      {/* Background Capsule */}
      <View
        style={[
          styles.backgroundCapsule,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            overflow: 'hidden',
          },
        ]}>
        {/* Filled Capsule */}
        <Animated.View
          style={[
            styles.capsuleFilled,
            {
              position: 'absolute',
              width: circleSize,
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
              backgroundColor: getUVColor(uvIndex),
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
          color={colors.primary}
        />
      </View>
    </View>
  );
};

const SunWrapper = ({uvIndex}: {uvIndex: number}) => {
  return (
    <View style={{display: 'flex', alignItems: 'center'}}>
      <Text style={{alignSelf: 'center', fontSize: 10}}>11+</Text>
      <SunAnimation uvIndex={uvIndex} />
      <Text style={{alignSelf: 'center', fontSize: 10}}>0</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  //capsule
  capsuleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    position: 'relative', // To position text absolutely if needed
  },
  backgroundCapsule: {
    backgroundColor: 'white',
  },
  capsuleFilled: {
    backgroundColor: 'orange',
    position: 'absolute', // Ensure it sits at the top of the background
    bottom: 0, // Align to the bottom of the background
  },
});
export default SunWrapper;
