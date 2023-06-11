import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_KEY, WEATHER_URL} from "../utils/constants";
import {IGeolocation, IWeather} from "../models/models";
import {Store} from "@ngrx/store";
import {getCoordinates} from "../store/selectors/geolocation.selector";
import {switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient, private store: Store) { }

  getWeather () {
    return this.http.get<IWeather>(WEATHER_URL + '?q=Minsk&appid=' + API_KEY);
  }

  getWeatherByCoordinates() {
    return this.store.select(getCoordinates).pipe(switchMap((coordinates) => {
      const { lat, lon } = coordinates as IGeolocation;
      return this.http.get<IWeather>(WEATHER_URL + `?lat=${lat}&lon=${lon}&appid=` + API_KEY);
    }))
  }
}
