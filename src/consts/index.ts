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
  0: 'day-sunny',
  1: 'day-sunny',
  2: 'cloudy',
  3: 'cloudy',
  45: 'fog',
  48: 'fog',
  51: 'rain',
  53: 'rain',
  55: 'rain',
  56: 'rain',
  57: 'rain',
  61: 'rain',
  63: 'rain',
  65: 'rains',
  66: 'rain',
  67: 'rains',
  71: 'snow',
  73: 'snow',
  75: 'snows',
  77: 'snow',
  80: 'rain',
  81: 'rain',
  82: 'rains',
  85: 'snow',
  86: 'snows',
  95: 'lightning',
  96: 'lightning',
  99: 'lightnings',
};
export const iconListNight: {[key: string]: string} = {
  0: 'night-clear',
  1: 'night-clear',
  2: 'cloudy',
  3: 'cloudy',
  45: 'fog',
  48: 'fog',
  51: 'rain',
  53: 'rain',
  55: 'rain',
  56: 'rain',
  57: 'rain',
  61: 'rain',
  63: 'rain',
  65: 'rains',
  66: 'rain',
  67: 'rains',
  71: 'snow',
  73: 'snow',
  75: 'snows',
  77: 'snow',
  80: 'rain',
  81: 'rain',
  82: 'rains',
  85: 'snow',
  86: 'snows',
  95: 'lightning',
  96: 'lightning',
  99: 'lightnings',
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
