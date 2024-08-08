import React, {useEffect, useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

// Chart configuration
const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};
const generateSinusoidalData = ({
  sunrise,
  sunset,
}: {
  sunset: Date;
  sunrise: Date;
}) => {
  const data = [];
  const numberOfPoints = 24; // Data points for 24 hours
  const amplitude = 1; // Max value of the sinusoidal wave
  const offset = 1.5; // Mid-point of the sinusoidal wave

  // Convert sunrise and sunset to hours
  const sunriseHour = sunrise.getUTCHours() + sunrise.getUTCMinutes() / 60;
  const sunsetHour = sunset.getUTCHours() + sunset.getUTCMinutes() / 60;

  for (let i = 0; i < numberOfPoints; i++) {
    const hour = i;
    const normalizedHour = (hour - sunriseHour) / (sunsetHour - sunriseHour); // Normalize hour between sunrise and sunset
    const angle = normalizedHour * 2 * Math.PI;
    const value = amplitude * Math.sin(angle - Math.PI / 2) + offset; // Sinusoidal calculation
    data.push(value);
  }

  return data;
};

const SunsetSunrise = ({
  sunrise,
  sunset,
}: {
  sunset: string;
  sunrise: string;
}) => {
  const screenWidth = Dimensions.get('window').width;

  const [data, setData] = useState<number[]>([]);
  const [dawnData, setDawnData] = useState<number[]>([]);

  const [duskData, setDuskData] = useState<number[]>([]);

  useEffect(() => {
    const rise = new Date(sunrise);
    const set = new Date(sunset);
    console.log(`sunrise:${rise}, sunset:${sunset}`);

    const data = generateSinusoidalData({sunrise: rise, sunset: set});
    console.log('data', data);

    // Define datasets for dawn and dusk
    const dawnData = Array(24)
      .fill(0)
      .map((_, i) =>
        i >= rise.getUTCHours() && i < rise.getUTCHours() + 1 ? data[i] : 0,
      );
    const duskData = Array(24)
      .fill(0)
      .map((_, i) =>
        i >= set.getUTCHours() - 1 && i < set.getUTCHours() ? data[i] : 0,
      );
    console.log('dusk', duskData);
    console.log('dawn', dawnData);

    if (data && dawnData && duskData) {
      setData(data.filter(item => item != null));
      setDawnData(dawnData);
      setDuskData(duskData);
    }
  }, [sunrise, sunset]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginBottom: 20}}></Text>
      {/* {data.length && dawnData.length && duskData.length && (
        <LineChart
          data={{
            labels: [], // Hourly labels
            datasets: [
              {
                data: dawnData,
                color: (opacity = 1) => `rgba(255, 223, 186, ${opacity})`, // Dawn color
              },
              {
                data: duskData,
                color: (opacity = 1) => `rgba(255, 105, 97, ${opacity})`, // Dusk color
              },
            ],
          }}
          width={screenWidth - 32} // Adjust width as needed
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
          }}
          bezier // Use bezier curve for smooth lines
          style={{marginVertical: 8}}
        />
      )} */}
    </View>
  );
};

export default SunsetSunrise;
