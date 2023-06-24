import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getIsFetchedWeather } from './store/selectors/weather.selector';
import { fetchGeolocation } from './store/actions/geolocation.action';
import { getIsFetchedGeolocation } from './store/selectors/geolocation.selector';
import {ErrorService} from "./services/error.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weather-forecast';
  isOpen = false;
  errorMessage = '';

  constructor(public store: Store, private errorService: ErrorService) {
    this.errorService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.errorService.errorMessage$.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
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

  onCloseModal() {
    this.errorService.closeModal();
  }
}
