import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../state.model";

export const getWeatherStore = createFeatureSelector('weather');

export const getWeather = createSelector(getWeatherStore as any, (state: AppState) => {
  state.weather;
});

export const getIsFetchedWeather = createSelector(getWeatherStore as any, (state: AppState) => {
  state.fetchedWeather
});

