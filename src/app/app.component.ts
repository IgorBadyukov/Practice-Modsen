import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./services/weather.service";
import {Store} from "@ngrx/store";
import {fetchWeather} from "./store/actions/weather.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'weather-forecast';

  constructor(private weatherServices: WeatherService, private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(fetchWeather());
  }
}
