import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { WEATHER_URL } from '../utils/constants';
import { IWeather } from '../models/weather.model';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<IWeather>,
    next: HttpHandler,
  ): Observable<HttpEvent<IWeather>> {
    if (request.method === 'GET' && request.url.includes(WEATHER_URL)) {
      const cachedResponse = localStorage.getItem(request.url);
      const expiration = localStorage.getItem(request.url + '_expiration');

      if (cachedResponse && expiration) {
        const expirationDate = new Date(expiration);
        if (expirationDate > new Date()) {
          return of(new HttpResponse<IWeather>(JSON.parse(cachedResponse)));
        } else {
          localStorage.removeItem(request.url);
          localStorage.removeItem(request.url + '_expiration');
        }
      }

      return next.handle(request).pipe(
        tap((event: HttpEvent<IWeather>) => {
          if (event instanceof HttpResponse) {
            localStorage.setItem(request.url, JSON.stringify(event));
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 2);
            localStorage.setItem(
              request.url + '_expiration',
              expirationDate.toISOString(),
            );
          }
        }),
      );
    } else {
      return next.handle(request);
    }
  }
}
