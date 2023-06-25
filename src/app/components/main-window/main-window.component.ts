import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { getWeather } from '../../store/selectors/weather.selector';
import { interval, startWith, Subject, switchMapTo, takeUntil } from 'rxjs';
import { MainWindowService } from '../../services/main-window.service';
import { fetchWeatherByName } from '../../store/actions/weather.action';
import { IWeatherList } from '../../models/weather.model';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss'],
})
export class MainWindowComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  suggestions: any[] = []
  currentDateTime = '';

  currentCity = '';

  currentCountry = '';

  weatherList: IWeatherList[] = [];

  currentWeather: IWeatherList;

  inputCity = '';

  constructor(
    private store: Store,
    private mainWindowService: MainWindowService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.subscribeWeather()
      .pipe(takeUntil(this.destroy$))
      .subscribe((weather) => {
        if (weather) {
          this.weatherList = [...(weather?.list as IWeatherList[])];
          this.mainWindowService
            .getDateAndTimeByCoordinates()
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
              if (data) {
                this.currentDateTime = data.formatted;
                this.currentCity = data.cityName;
                this.currentCountry = data.countryName;
                this.inputCity = data.cityName;
                this.currentWeather = this.weatherList[0];
              }
            });
        }
      }, () => {
        console.log('Такой город не найден: ' + this.inputCity);
      });
  }

  selectSuggestion(suggestion: any) {
    this.inputCity = suggestion.matching_full_name.split(',')[0].trim();
    this.suggestions = [];
  }

  getAutocompleteSuggestions() {
    const url = `https://api.teleport.org/api/cities/?search=${this.inputCity}&limit=5`;
    this.http.get(url).subscribe((response: any) => {
      if (response._embedded && response._embedded["city:search-results"]) {
        this.suggestions = response._embedded["city:search-results"];
        console.log(this.suggestions);
      } else {
        this.suggestions = [];
      }
    });
  }

  enterCity() {
    this.store.dispatch(fetchWeatherByName({ name: this.inputCity }));
  }

  subscribeWeather() {
    return interval(30000).pipe(
      startWith(0),
      switchMapTo(this.store.select(getWeather)),
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
