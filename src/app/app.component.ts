import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getIsFetchedWeather} from "./store/selectors/weather.selector";
import {fetchGeolocation} from "./store/actions/geolocation.action";
import {getIsFetchedGeolocation} from "./store/selectors/geolocation.selector";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'weather-forecast';

  constructor(public store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(fetchGeolocation());
  }

  checkLoadWeather() {
    return this.store.select(getIsFetchedWeather);
  }

  checkLoadGeolocation() {
    return this.store.select(getIsFetchedGeolocation);
  }
}
