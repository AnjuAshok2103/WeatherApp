import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../redux/store';
import {WeatherData} from '../../types';

// Define a type for the slice state
export interface WeatherState {
  weatherData: WeatherData[];
}

// Define the initial state using that type
const initialState: WeatherState = {
  weatherData: [],
};

export const weatherSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addWeatherData: (state, action) => {
      state.weatherData.push(action.payload);
    },
    removeWeatherData: (state, action) => {
      console.log(`reducer remove ${JSON.stringify(action)}`);
      state.weatherData = state.weatherData.filter(
        (item, index) => index !== action.payload.index,
      );
      console.log('state', JSON.stringify(state.weatherData.length));
    },
  },
});

export const {addWeatherData, removeWeatherData} = weatherSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;
