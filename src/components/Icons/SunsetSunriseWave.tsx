import {subMinutes, addMinutes, differenceInMinutes} from 'date-fns';
import {toZonedTime, format} from 'date-fns-tz';
import React from 'react';
import {View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {formatDateTime} from '../../utils';
import {useTheme} from 'react-native-paper';

const DayChart = ({
  sunriseISO,
  sunsetISO,
  timezone,
}: {
  sunriseISO: string;
  sunsetISO: string;
  timezone: string;
}) => {
  const {colors} = useTheme();
  const sunrise = new Date(sunriseISO);
  const sunset = new Date(sunsetISO);

  const validOffset = value => (isNaN(value) ? 0 : value);

  // Convert sunrise and sunset times to minutes from midnight
  const sunriseMinutes = sunrise.getHours() * 60 + sunrise.getMinutes();
  const sunsetMinutes = sunset.getHours() * 60 + sunset.getMinutes();

  // Get current time in the specified timezone
  const getCurrentTimeInTimezone = (timezone: string) => {
    const utcDate = new Date();
    const zonedDate = toZonedTime(utcDate, timezone);
    return zonedDate;
  };

  const current = getCurrentTimeInTimezone(timezone);

  // Calculate start and end times
  const startTime = subMinutes(sunrise, 30);
  const endTime = addMinutes(sunset, 30);

  // Calculate offsets from the sunrise and sunset times
  const sunriseOffset = differenceInMinutes(current, startTime);
  const currentOffset = differenceInMinutes(current, sunrise);
  const sunsetOffset = differenceInMinutes(current, sunset);
  const sunsetPlus30Offset = differenceInMinutes(current, endTime);

  // Prepare data for the chart
  const data = {
    labels: [
      formatDateTime({isoString: sunriseISO, showMinutes: true}),
      'Now',
      formatDateTime({isoString: sunsetISO, showMinutes: true}),
    ],
    datasets: [
      {
        data: [
          -validOffset(sunriseOffset),
          validOffset(currentOffset),
          validOffset(sunsetOffset),
          validOffset(sunsetPlus30Offset),
        ],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Line color
        strokeWidth: 1, // Line thickness
      },
    ],
  };

  // Chart configuration
  const chartConfig1 = {
    backgroundColor: colors.background,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 5,
    },
    propsForDots: {
      r: '3',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  return (
    <View style={{flex: 1}}>
      <LineChart
        data={data}
        width={300} // Width of the chart
        height={100} // Height of the chart
        fromZero={true}
        bezier
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // Interval between ticks on the y-axis
        withDots={true}
        withVerticalLines={false}
        withHorizontalLines={false}
        withVerticalLabels={true}
        withHorizontalLabels={false}
        // Adjust the x-axis limits based on total range and offsets
        chartConfig={{
          ...chartConfig1,
        }}
      />
    </View>
  );
};

export default DayChart;
