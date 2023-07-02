import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  fetchGeolocation,
  fetchGeolocationError,
  fetchGeolocationSuccess,
} from "../actions/geolocation.action";
import { GeolocationService } from "../../services/geolocation.service";
import { catchError, concatMap, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { fetchWeatherByCoordinates } from "../actions/weather.action";

@Injectable()
export class GeolocationEffect {
  constructor(
    private action$: Actions,
    private geolocationService: GeolocationService,
    private store: Store
  ) {}

  fetchGeolocation$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchGeolocation),
      switchMap(() => {
        return this.geolocationService.getCurrentLocation().pipe(
          concatMap((geolocation) => [
            fetchGeolocationSuccess({ geolocation }),
            fetchWeatherByCoordinates(),
          ]),
          catchError(() => of(fetchGeolocationError()))
        );
      })
    )
  );
}
