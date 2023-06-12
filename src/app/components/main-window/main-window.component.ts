import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IDateTime, IWeather} from "../../models/models";
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
  public currentDateTime: string = '';
  public currentCity = '';
  public currentCountry = '';
  private subscription: Subscription | null = null;

  constructor(private store: Store, private mainWindowService: MainWindowService) {
  }

  ngOnInit() {
    this.weather$ = this.store.select(getWeather);
    this.subscription = interval(5000).pipe(
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
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
