import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { DATETIME_API_KEY, DATETIME_URL, SUGGESTION_URL } from '../utils/constants';
import { Store } from '@ngrx/store';
import { getCoordinatesByWeather } from '../store/selectors/weather.selector';
import { IDateTime } from '../models/date.model';
import { IGeolocation } from '../models/geolocation.model';
import { ISuggestion } from '../models/suggestion.model';

@Injectable({
  providedIn: 'root',
})
export class MainWindowService {
  constructor(private http: HttpClient, private store: Store) {}

  getDateAndTimeByCoordinates(): Observable<IDateTime | null> {
    return this.store.select(getCoordinatesByWeather).pipe(
      switchMap((coordinates) => {
        if (coordinates) {
          const { lat, lon } = coordinates as IGeolocation;
          return this.http.get<IDateTime>(
            DATETIME_URL + DATETIME_API_KEY + `&format=json&by=position&lat=${lat}&lng=${lon}`,
          );
        } else {
          return of(null);
        }
      }),
    );
  }

  getSuggestion(inputCity: string): Observable<ISuggestion> {
    return this.http.get<ISuggestion>(SUGGESTION_URL + inputCity + '&limit=5');
  }
}
