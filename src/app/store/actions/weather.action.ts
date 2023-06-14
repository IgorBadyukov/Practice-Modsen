import {createAction, props} from "@ngrx/store";
import {IWeather} from "../../models/models";
import {EWeatherActionSource} from "../../utils/enums";

export const fetchWeatherByName = createAction(EWeatherActionSource.GetWeatherByName,  props<{ name: string }>());
export const fetchWeatherByCoordinates = createAction(EWeatherActionSource.GetWeatherByCoordinates);
export const fetchWeatherSuccess = createAction(EWeatherActionSource.GetWeatherSuccess, props<{ weather: IWeather }>());
export const fetchWeatherError = createAction(EWeatherActionSource.GetWeatherError);
