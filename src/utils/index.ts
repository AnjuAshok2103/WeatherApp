import {
  iconList,
  iconListNight,
  PressureCategory,
  UVColors,
  UVLevels,
  UVLevelsInfoText,
  weatherCodeDescriptions,
} from '../consts';

export const getFirstWord = (str: string) => {
  const words = str.split(',');
  return words[0].trim();
};

export const getWeatherDescription = (
  input: string | number,
): string | string[] => {
  if (typeof input === 'number') {
    return weatherCodeDescriptions[input] || 'Unknown weather code';
  } else if (typeof input === 'string') {
    const codeArray = input.split(',').map(code => parseInt(code.trim(), 10));
    return codeArray.map(
      code => weatherCodeDescriptions[code] || 'Unknown weather code',
    );
  }
  return 'Invalid input';
};

export const getIconName = ({
  weatherCode,
  isoString,
}: {
  weatherCode: number;
  isoString: string;
}): string => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return ampm === 'AM'
    ? iconList[weatherCode]
    : iconListNight[weatherCode] || 'unknown-icon';
};

export function formatDateTime({
  isoString,
  showMinutes,
}: {
  isoString: string;
  showMinutes?: boolean;
}): string {
  const date = new Date(isoString);
  const now = new Date();

  // Check if the given time is the current time
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate() &&
    date.getHours() === now.getHours()
  ) {
    return 'Now';
  }

  // Format the time in 12-hour format with AM/PM
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours} ${
    showMinutes ? `:${formattedMinutes}` : ''
  } ${ampm}`;
}

export function getDate(dateString: string): number {
  const date = new Date(dateString);
  return date.getDate();
}

export function getMonthOfYear(dateString: string): number {
  const date = new Date(dateString);
  return date.getMonth();
}

export function getMonthName(dateString: string): string {
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(dateString);
  return monthsOfYear[date.getMonth()].slice(0, 3);
}

export function getDayName(dateString: string): string {
  const dateFormatted = new Date(dateString);
  const now = new Date();

  // Check if the given time is the current time
  if (
    dateFormatted.getFullYear() === now.getFullYear() &&
    dateFormatted.getMonth() === now.getMonth() &&
    dateFormatted.getDate() === now.getDate()
  ) {
    return 'Today';
  }

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()].slice(0, 3);
}

export function roundTemperature(temperature: number): number {
  return Math.round(temperature);
}

export function getWindDirection(degree: number): string {
  const directions16 = [
    'North (N)',
    'North-North-East (NNE)',
    'North-East (NE)',
    'East-North-East (ENE)',
    'East (E)',
    'East-South-East (ESE)',
    'South-East (SE)',
    'South-South-East (SSE)',
    'South (S)',
    'South-South-West (SSW)',
    'South-West (SW)',
    'West-South-West (WSW)',
    'West (W)',
    'West-North-West (WNW)',
    'North-West (NW)',
    'North-North-West (NNW)',
  ];
  const directions8 = [
    'North (N)',
    'North-East (NE)',
    'East (E)',
    'South-East (SE)',
    'South (S)',
    'South-West (SW)',
    'West (W)',
    'North-West (NW)',
  ];

  // Normalize the degree to the range [0, 360)
  const normalizedDegree = ((degree % 360) + 360) % 360;

  // Calculate index for 16 directions
  const index16 = Math.floor((normalizedDegree + 11.25) / 22.5) % 16;

  // Map to 8 directions
  const index8 = Math.floor((index16 + 0.5) / 2) % 8;

  return directions8[index8];
}

export function calculateDewPoint(
  temperature: number,
  relativeHumidity: number,
): number {
  const a = 17.27;
  const b = 237.7;
  const alpha =
    (a * temperature) / (b + temperature) + Math.log(relativeHumidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return dewPoint;
}

export function getUVLevelInfo(uvIndex: number): string {
  if (uvIndex >= 0 && uvIndex <= 2) {
    return UVLevels['0-2'];
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    return UVLevels['3-5'];
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    return UVLevels['6-7'];
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    return UVLevels['8-10'];
  } else if (uvIndex >= 11) {
    return UVLevels['11+'];
  } else {
    return 'UV index out of range.';
  }
}

// Function to get the appropriate message for a given UV index
export function getUVLevelInfoText(uvIndex: number): string {
  if (uvIndex >= 0 && uvIndex <= 2) {
    return UVLevelsInfoText['0-2'];
  } else if (uvIndex >= 3 && uvIndex <= 7) {
    return UVLevelsInfoText['3-7'];
  } else if (uvIndex >= 8 && uvIndex <= 11) {
    return UVLevelsInfoText['8-11'];
  } else {
    return 'UV index out of range.';
  }
}

/**
 * Checks the atmospheric pressure and returns its category.
 *
 * @param pressure - The atmospheric pressure in hPa (hectopascals).
 * @returns The category of the atmospheric pressure: Low, Standard, or High.
 */
export function classifyPressure(pressure: number): PressureCategory {
  const STANDARD_PRESSURE = 1013.25; // Standard atmospheric pressure in hPa
  const LOW_PRESSURE_THRESHOLD = 1000; // Threshold for low pressure in hPa
  const HIGH_PRESSURE_THRESHOLD = 1020; // Threshold for high pressure in hPa

  if (pressure < LOW_PRESSURE_THRESHOLD) {
    return PressureCategory.Low;
  } else if (pressure > HIGH_PRESSURE_THRESHOLD) {
    return PressureCategory.High;
  } else {
    return PressureCategory.Standard;
  }
}

// Function to get color based on UV level
export function getUVColor(uvIndex: number): string {
  let uvLevel: string = '';

  if (uvIndex >= 0 && uvIndex <= 2) {
    uvLevel = 'Low';
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    uvLevel = 'Moderate';
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    uvLevel = 'High';
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    uvLevel = 'Very High';
  } else if (uvIndex >= 11) {
    uvLevel = 'Extreme';
  } else {
    return '#000000'; // Return black for invalid UV index
  }

  return UVColors[uvLevel];
}
