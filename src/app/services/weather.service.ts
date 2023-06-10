import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_KEY, WEATHER_URL} from "../utils/constants";
import {IWeather} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather () {
    return this.http.get<IWeather>(WEATHER_URL + '?q=Minsk&appid=' + API_KEY);
  }
}
