import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getCoordinates} from "../store/selectors/geolocation.selector";
import {Observable, shareReplay, switchMap} from "rxjs";
import {IDateTime, IGeolocation, IWeather} from "../models/models";
import {DATETIME_API_KEY, DATETIME_URL, WEATHER_API_KEY, WEATHER_URL} from "../utils/constants";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class MainWindowService {
  constructor(private http: HttpClient, private store: Store) { }

  getDateAndTimeByCoordinates() {
  return this.store.select(getCoordinates).pipe(switchMap((coordinates) => {
      const { lat, lon } = coordinates as IGeolocation;
      return this.http.get<IDateTime>(DATETIME_URL + DATETIME_API_KEY + `&format=json&by=position&lat=${lat}&lng=${lon}`);
    }))
  }
}
