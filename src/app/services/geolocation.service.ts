import { Injectable } from '@angular/core';
import {IGeolocation} from "../models/models";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  getCurrentLocation() {
    return new Observable<IGeolocation>((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            observer.next({lat: position.coords.latitude, lon: position.coords.longitude});
            observer.complete();
          },
          (error) => {
            console.log('Error occurred while retrieving geolocation: ' + error.message);
            observer.error(error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
        observer.error('Geolocation is not supported');
      }
    }).pipe(
      catchError((error) => {
        // Обработка ошибки и возврат значения по умолчанию или другой логики
        console.log('Error occurred in getCurrentLocation: ' + error);
        return of({lat: 0, lon: 0}); // Возврат значения по умолчанию или другой логики
      })
    );
  }
}
