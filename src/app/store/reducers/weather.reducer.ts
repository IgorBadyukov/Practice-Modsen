import {createReducer, on} from "@ngrx/store";
import {initialSate} from "../state.model";
import {fetchWeather, fetchWeatherError, fetchWeatherSuccess} from "../actions/weather.action";

export const weatherReducer = createReducer(
  initialSate,
  on(fetchWeather, (state) => ({...state, weather: null, fetchedWeather: true})),
  on(fetchWeatherSuccess, (state, {weather}) => ({...state, weather, fetchedWeather: false})),
  on(fetchWeatherError, (state) => ({...state, fetchedWeather: false}))
)
