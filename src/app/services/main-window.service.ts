import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getCoordinates} from "../store/selectors/geolocation.selector";
import {of, switchMap} from "rxjs";
import {IDateTime, IGeolocation} from "../models/models";
import {DATETIME_API_KEY, DATETIME_URL} from "../utils/constants";
import {Store} from "@ngrx/store";
import {getCoordinatesByWeather} from "../store/selectors/weather.selector";

@Injectable({
  providedIn: 'root'
})
export class MainWindowService {
  constructor(private http: HttpClient, private store: Store) {}

  getDateAndTimeByCoordinates() {
    return this.store.select(getCoordinatesByWeather).pipe(switchMap((coordinates) => {
      if (coordinates) {
        const { lat, lon } = coordinates as IGeolocation;
        return this.http.get<IDateTime>(DATETIME_URL + DATETIME_API_KEY + `&format=json&by=position&lat=${lat}&lng=${lon}`);
      } else {
        return of(null);
      }
    }))
  }
}
