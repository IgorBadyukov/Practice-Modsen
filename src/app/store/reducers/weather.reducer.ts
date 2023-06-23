import { createReducer, on } from '@ngrx/store';
import { initialSateWeather } from '../state.model';
import {
  fetchWeatherByCoordinates,
  fetchWeatherByName,
  fetchWeatherError,
  fetchWeatherSuccess,
} from '../actions/weather.action';

export const weatherReducer = createReducer(
  initialSateWeather,
  on(fetchWeatherByCoordinates, (state) => ({
    ...state,
    fetchedWeather: true,
  })),
  on(fetchWeatherByName, (state) => ({ ...state, fetchedWeather: true })),
  on(fetchWeatherSuccess, (state, { weather }) => ({
    ...state,
    weather,
    fetchedWeather: false,
  })),
  on(fetchWeatherError, (state) => ({ ...state, fetchedWeather: false })),
);
