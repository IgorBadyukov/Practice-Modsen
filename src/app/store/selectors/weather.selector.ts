import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateWeather} from "../state.model";
import {IWeather} from "../../models/models";

export const getWeatherStore = createFeatureSelector('weather');
export const getWeather = createSelector(getWeatherStore as any, (state: AppStateWeather) => state.weather);
export const getIsFetchedWeather = createSelector(getWeatherStore as any, (state: AppStateWeather) => state.fetchedWeather);
export const getCoordinatesByWeather = createSelector(getWeather as any, (weather: IWeather) => weather.city.coord ? weather.city.coord : null);

