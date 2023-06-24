import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '../../services/weather.service';
import {
  fetchWeatherByCoordinates,
  fetchWeatherByName,
  fetchWeatherError,
  fetchWeatherSuccess,
} from '../actions/weather.action';
import { map, catchError, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import {ErrorService} from "../../services/error.service";

@Injectable()
export class WeatherEffect {
  constructor(
    private action$: Actions,
    private weatherService: WeatherService,
    private errorService: ErrorService
  ) {}

  fetchWeatherByCoordinates$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchWeatherByCoordinates),
      switchMap(() =>
        this.weatherService.getWeatherByCoordinates().pipe(
          map((weather) => fetchWeatherSuccess({ weather })),
          catchError(() => of(fetchWeatherError())),
        ),
      ),
    ),
  );

  fetchWeatherByName$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchWeatherByName),
      map((action) => {
        return action.name;
      }),
      switchMap((name: string) => {
        return this.weatherService.getWeatherByName(name).pipe(
          map((weather) => fetchWeatherSuccess({ weather })),
          catchError(() => {
            const errorMessage = 'An error occurred while fetching weather data.';
            this.errorService.openModal(errorMessage);
            return of(fetchWeatherError())
          }),
        );
      }),
    ),
  );
}
