import { IWeather } from '../models/weather.model';
import { IGeolocation } from '../models/geolocation.model';

export interface AppStateWeather {
  weather: IWeather | null;
  fetchedWeather: boolean;
}

export interface AppStateGeolocation {
  geolocation: IGeolocation | null;
  fetchedGeolocation: boolean;
}

export const initialSateWeather = {
  weather: null,
  fetchedWeather: false,
} as AppStateWeather;

export const initialSateGeolocation = {
  geolocation: null,
  fetchedGeolocation: false,
} as AppStateGeolocation;
