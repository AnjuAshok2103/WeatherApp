import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const WeatherCard = ({weatherData}: {weatherData: any}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{weatherData.title}</Text>
      <Text>Temperature: {weatherData.temperature}°C</Text>
      <Text>Humidity: {weatherData.humidity}%</Text>
      <Text>Wind Speed: {weatherData.windSpeed} km/h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    margin: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WeatherCard;
