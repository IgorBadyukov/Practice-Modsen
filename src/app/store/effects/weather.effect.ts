import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WeatherService} from "../../services/weather.service";
import {fetchWeather, fetchWeatherError, fetchWeatherSuccess} from "../actions/weather.action";
import {switchMapTo, map, catchError, of} from "rxjs";

@Injectable()
export class WeatherEffect {
  constructor(private action$: Actions, private weatherService: WeatherService) {
  }

  fetchWeather$ = createEffect(() => this.action$.pipe(
    ofType(fetchWeather),
    switchMapTo(this.weatherService.getWeather().pipe(
      map(weather => fetchWeatherSuccess({weather})),
      catchError(() => of(fetchWeatherError()))
    ))
  ))
}
