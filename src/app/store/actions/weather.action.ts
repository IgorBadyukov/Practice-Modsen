import {createAction, props} from "@ngrx/store";
import {IWeather} from "../../models/models";
import {EWeatherActionSource} from "../../utils/enums";

export const fetchWeather = createAction(EWeatherActionSource.GetWeather);
export const fetchWeatherSuccess = createAction(EWeatherActionSource.GetWeatherSuccess, props<{ weather: IWeather }>());
export const fetchWeatherError = createAction(EWeatherActionSource.GetWeatherError);
