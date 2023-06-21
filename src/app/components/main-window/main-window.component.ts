import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IDateTime, IWeather, IWeatherList} from "../../models/models";
import {getCoordinatesByWeather, getWeather} from "../../store/selectors/weather.selector";
import {
  catchError,
  interval,
  map,
  Observable,
  startWith,
  Subscription,
  switchMap,
  switchMapTo,
  tap,
  throwError
} from "rxjs";
import {MainWindowService} from "../../services/main-window.service";
import {fetchWeatherByName} from "../../store/actions/weather.action";
import {getCoordinates} from "../../store/selectors/geolocation.selector";

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit, OnDestroy {
  public currentDateTime: string = '';
  public currentCity = '';
  public currentCountry = '';
  private subscriptionDateTime: Subscription | null = null;
  private subscriptionWeather: Subscription | null = null;
  public weatherList: IWeatherList[] = [];
  public currentWeather: IWeatherList;
  public inputCity = '';
  public dateTime$: Observable<IDateTime> | null = null;

  constructor(private store: Store, private mainWindowService: MainWindowService) {
  }

  ngOnInit() {
   this.subscribeWeather().subscribe((weather) => {
     if (weather) {
       this.weatherList = [...(weather?.list as IWeatherList[])];
       this.mainWindowService.getDateAndTimeByCoordinates().subscribe((data) => {
         if (data) {
           this.currentDateTime = data.formatted;
           this.currentCity = data.cityName;
           this.currentCountry = data.countryName;
           this.inputCity = data.cityName;
           this.currentWeather = this.weatherList[0];
         }
       });
     }
   });
  }

  enterCity(event: Event) {
    this.store.dispatch(fetchWeatherByName({name: this.inputCity}));
  }

  subscribeWeather() {
    return interval(30000).pipe(
      startWith(0),
      switchMapTo(this.store.select(getWeather))
    )
  }


  ngOnDestroy() {
    this.subscriptionDateTime?.unsubscribe();
    this.subscriptionWeather?.unsubscribe();
  }
}
