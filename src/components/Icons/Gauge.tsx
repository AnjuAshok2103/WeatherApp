import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Svg, {G, Path, Line, Text as SvgText, Circle} from 'react-native-svg';

interface GaugeProps {
  value: number; // Value to display (0-1035)
  maxValue: number;
}

const Gauge: React.FC<GaugeProps> = ({value, maxValue}) => {
  const size = 60; // Diameter of the semicircle
  const strokeWidth = 10; // Thickness of the gauge
  const radius = (size - strokeWidth) / 2;
  const centerX = size / 2;
  const centerY = size / 2;

  // Convert value to an angle (0 to 180 degrees)
  const angle = (value / maxValue) * 180;
  const radian = (angle * Math.PI) / 180;

  // Calculate the end point of the gauge arc
  const endX = centerX + radius * Math.cos(Math.PI - radian);
  const endY = centerY - radius * Math.sin(Math.PI - radian);

  // Calculate the path for the gauge arc
  const arcPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 ${
    angle > 180 ? 1 : 0
  } 1 ${endX} ${endY}`;

  // Generate scale lines
  const numOfLines = 30;
  const scaleLines = Array.from({length: numOfLines}, (_, i) => {
    const lineAngle = (i / (numOfLines - 1)) * 180;
    const lineRadian = (lineAngle * Math.PI) / 180;
    const lineStartX =
      centerX + (radius - strokeWidth / 2) * Math.cos(Math.PI - lineRadian);
    const lineStartY =
      centerY - (radius - strokeWidth / 2) * Math.sin(Math.PI - lineRadian);
    const lineEndX =
      centerX + (radius + strokeWidth / 2) * Math.cos(Math.PI - lineRadian);
    const lineEndY =
      centerY - (radius + strokeWidth / 2) * Math.sin(Math.PI - lineRadian);

    return (
      <Line
        key={i}
        x1={lineStartX}
        y1={lineStartY}
        x2={lineEndX}
        y2={lineEndY}
        stroke="white"
        strokeWidth="1"
      />
    );
  });
  const {colors} = useTheme();

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Svg width={size} height={size / 2} style={{backgroundColor: 'pink'}}>
        <G>
          {/* Background Arc */}
          <Path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 1 ${
              centerX + radius
            } ${centerY}`}
            stroke="#d8e7f5"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Gauge Arc */}
          <Path
            d={arcPath}
            stroke="#5191cc"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Scale Lines */}
          {scaleLines}
          {/* Current Value */}
          <SvgText
            x={centerX}
            y={centerY + radius / 2}
            textAnchor="middle"
            fontSize="20"
            fill={colors.primary}>
            {value}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};

const GaugeWrapper = ({pressure}: {pressure: number}) => {
  const maxValue = 1035; // Maximum value for the gauge

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Gauge value={pressure} maxValue={maxValue} />
    </View>
  );
};

export default GaugeWrapper;
