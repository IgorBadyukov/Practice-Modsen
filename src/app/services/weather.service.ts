import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEATHER_API_KEY, WEATHER_URL } from '../utils/constants';
import { Store } from '@ngrx/store';
import { getCoordinates } from '../store/selectors/geolocation.selector';
import { Observable, switchMap } from 'rxjs';
import { IWeather } from '../models/weather.model';
import { IGeolocation } from '../models/geolocation.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient, private store: Store) {}

  getWeatherByName(name: string): Observable<IWeather> {
    return this.http.get<IWeather>(WEATHER_URL + `?q=${name}&appid=` + WEATHER_API_KEY);
  }

  getWeatherByCoordinates(): Observable<IWeather> {
    return this.store.select(getCoordinates).pipe(
      switchMap((coordinates) => {
        const { lat, lon } = coordinates as IGeolocation;
        return this.http.get<IWeather>(
          WEATHER_URL + `?lat=${lat}&lon=${lon}&appid=` + WEATHER_API_KEY,
        );
      }),
    );
  }
}
