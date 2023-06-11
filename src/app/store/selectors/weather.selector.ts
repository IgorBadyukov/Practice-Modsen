import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateWeather} from "../state.model";

export const getWeatherStore = createFeatureSelector('weather');
export const getWeather = createSelector(getWeatherStore as any, (state: AppStateWeather) => state.weather);
export const getIsFetchedWeather = createSelector(getWeatherStore as any, (state: AppStateWeather) => state.fetchedWeather);

