import {IWeather} from "../models/models";


export interface AppState {
  weather: IWeather | null,
  fetchedWeather: boolean
}

export const initialSate = {
  weather: null,
  fetchedWeather: false
} as AppState;
