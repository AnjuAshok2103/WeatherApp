export const weatherCodeDescriptions: {[key: string]: string} = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Drizzle: Light intensity',
  53: 'Drizzle: Moderate intensity',
  55: 'Drizzle: Dense intensity',
  56: 'Freezing Drizzle: Light intensity',
  57: 'Freezing Drizzle: Dense intensity',
  61: 'Rain: Slight intensity',
  63: 'Rain: Moderate intensity',
  65: 'Rain: Heavy intensity',
  66: 'Freezing Rain: Light intensity',
  67: 'Freezing Rain: Heavy intensity',
  71: 'Snow fall: Slight intensity',
  73: 'Snow fall: Moderate intensity',
  75: 'Snow fall: Heavy intensity',
  77: 'Snow grains',
  80: 'Rain showers: Slight intensity',
  81: 'Rain showers: Moderate intensity',
  82: 'Rain showers: Violent intensity',
  85: 'Snow showers: Slight intensity',
  86: 'Snow showers: Heavy intensity',
  95: 'Thunderstorm: Slight or moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export const iconList: {[key: string]: string} = {
  0: 'weather-sunny',
  1: 'weather-sunny',
  2: 'weather-partly-cloudy',
  3: 'weather-cloudy',
  45: 'weather-fog',
  48: 'weather-fog',
  51: 'weather-pouring',
  53: 'weather-pouring',
  55: 'weather-rainy',
  56: 'weather-snowy',
  57: 'weather-snowy-heavy',
  61: 'weather-pouring',
  63: 'weather-pouring',
  65: 'weather-rainy',
  66: 'weather-snowy',
  67: 'weather-snowy-heavy',
  71: 'weather-snowy',
  73: 'weather-snowy',
  75: 'weather-snowy-heavy',
  77: 'weather-snowy',
  80: 'weather-pouring',
  81: 'weather-pouring',
  82: 'weather-rainy',
  85: 'weather-snowy',
  86: 'weather-snowy-heavy',
  95: 'weather-lightning',
  96: 'weather-hail',
  99: 'weather-hail',
};
export const iconListNight: {[key: string]: string} = {
  0: 'weather-night',
  1: 'weather-night',
  2: 'weather-night-partly-cloudy',
  3: 'weather-cloudy',
  45: 'weather-fog',
  48: 'weather-fog',
  51: 'weather-pouring',
  53: 'weather-pouring',
  55: 'weather-rainy',
  56: 'weather-snowy',
  57: 'weather-snowy-heavy',
  61: 'weather-pouring',
  63: 'weather-pouring',
  65: 'weather-rainy',
  66: 'weather-snowy',
  67: 'weather-snowy-heavy',
  71: 'weather-snowy',
  73: 'weather-snowy',
  75: 'weather-snowy-heavy',
  77: 'weather-snowy',
  80: 'weather-pouring',
  81: 'weather-pouring',
  82: 'weather-rainy',
  85: 'weather-snowy',
  86: 'weather-snowy-heavy',
  95: 'weather-lightning',
  96: 'weather-hail',
  99: 'weather-hail',
};

export const UVLevelsInfoText: {[key: string]: string} = {
  '0-2': 'You can safely enjoy being outside!',
  '3-7': 'Slip on a shirt, slop on sunscreen and slap on hat!',
  '8-11': 'Use sun protection',
};

export const UVLevels: {[key: string]: string} = {
  '0-2': 'Low',
  '3-5': 'Moderate',
  '6-7': 'High',
  '8-10': 'Very High',
  '11+': 'Extreme',
};

// Define the colors for each UV level
export const UVColors: {[key: string]: string} = {
  Low: '#99FF99', // Green
  Moderate: '#FFFF00', // Yellow
  High: '#FFC966', // Orange
  'Very High': '#FF7C4C', // Red-Orange
  Extreme: '#FF3232', // Red
};

export enum PressureCategory {
  Low = 'Low',
  Standard = 'Standard',
  High = 'High',
}
