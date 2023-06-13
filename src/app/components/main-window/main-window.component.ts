import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IDateTime, IWeather, IWeatherList} from "../../models/models";
import {getWeather} from "../../store/selectors/weather.selector";
import {catchError, interval, Observable, startWith, Subscription, switchMap, throwError} from "rxjs";
import {MainWindowService} from "../../services/main-window.service";

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit, OnDestroy {
  public weather$: Observable<IWeather | null> | null = null;
  public currentDateTime = '';
  public currentCity = '';
  public currentCountry = '';
  private subscriptionDateTime: Subscription | null = null;
  private subscriptionWeather: Subscription | null = null;
  public weatherList: IWeatherList[] = [];

  constructor(private store: Store, private mainWindowService: MainWindowService) {
  }

  ngOnInit() {
    this.weather$ = this.store.select(getWeather);
    this.subscriptionDateTime = interval(5000).pipe(
      startWith(0),
      switchMap(() =>
        this.mainWindowService.getDateAndTimeByCoordinates().pipe(
          catchError((error) => {
            console.error('Ошибка при получении времени:', error);
            return throwError(error);
          })
        )
      )
    ).subscribe((res: IDateTime) => {
      this.currentDateTime = res.formatted;
      this.currentCity = res.cityName;
      this.currentCountry = res.countryName;
      if (!this.subscriptionWeather) {
        this.subscriptionWeather = this.store.select(getWeather).subscribe((weather: IWeather | null) => {
          this.weatherList = [...(weather?.list as IWeatherList[])];
        })
      }
    });
  }

  getGridColumnClass(index: number): string {
    if (index === 0 || index === 1) {
      return 'column1';
    } else {
      return 'column' + ((index - 2) % 4 + 3);
    }
  }

  ngOnDestroy() {
    this.subscriptionDateTime?.unsubscribe();
    this.subscriptionWeather?.unsubscribe();
  }
}
