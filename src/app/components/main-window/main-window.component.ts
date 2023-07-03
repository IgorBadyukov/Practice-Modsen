import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getWeather } from "../../store/selectors/weather.selector";
import { interval, startWith, Subject, switchMapTo, takeUntil } from "rxjs";
import { MainWindowService } from "../../services/main-window.service";
import { fetchWeatherByName } from "../../store/actions/weather.action";
import { IWeatherList } from "../../models/weather.model";
import { ISuggestion } from "../../models/suggestion.model";

@Component({
  selector: "app-main-window",
  templateUrl: "./main-window.component.html",
  styleUrls: ["./main-window.component.scss", "./main-window.media.scss"],
})
export class MainWindowComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  isCurrentDateTimeEmpty: boolean;

  isSuggestionSkip = true;

  suggestions: { matching_full_name: string }[] = [];

  currentIcon = "";

  _currentDateTime = "";

  activeDate = "";

  currentCity = "";

  currentCountry = "";

  weatherList: IWeatherList[] = [];

  currentWeather: IWeatherList;

  inputCity = "";

  constructor(
    private store: Store,
    private mainWindowService: MainWindowService
  ) {}

  ngOnInit(): void {
    this.store
      .select(getWeather)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (weather) => {
          if (weather) {
            this.weatherList = [...(weather?.list as IWeatherList[])];
            this.activeDate = this.weatherList[0].dt_txt;
            this.currentIcon = this.findMostRepeatedIcon(this.activeDate);
            interval(30000)
              .pipe(
                startWith(0),
                switchMapTo(
                  this.mainWindowService
                    .getDateAndTimeByCoordinates()
                    .pipe(takeUntil(this.destroy$))
                )
              )
              .subscribe((data) => {
                if (data) {
                  this.currentDateTime = data.formatted;
                  this.activeDate =
                    this.activeDate === "" ? data.formatted : this.activeDate;
                  this.currentCity = data.cityName;
                  this.currentCountry = data.countryName;
                  this.inputCity = data.cityName;
                  this.currentWeather = this.weatherList[0];
                }
              });
          }
        },
        () => {
          console.log("Такой город не найден: " + this.inputCity);
        }
      );
  }

  selectSuggestion(suggestion: { matching_full_name: string }): void {
    this.isSuggestionSkip = true;
    this.inputCity = suggestion.matching_full_name.split(",")[0].trim();
    this.store.dispatch(fetchWeatherByName({ name: this.inputCity }));
    this.suggestions = [];
  }

  getAutocompleteSuggestions(): void {
    if (this.inputCity === "") {
      this.suggestions = [];
      return;
    }
    this.isSuggestionSkip = !this.isSuggestionSkip;
    if (this.isSuggestionSkip) {
      return;
    }
    this.mainWindowService
      .getSuggestion(this.inputCity)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ISuggestion) => {
        if (response._embedded && response._embedded["city:search-results"]) {
          this.suggestions = response._embedded["city:search-results"];
        } else {
          this.suggestions = [];
        }
      });
  }

  findMostRepeatedIcon(targetDate: string): string {
    const iconCount: { [icon: string]: number } = {};
    for (const weather of this.weatherList) {
      if (weather.dt_txt.substr(0, 10) === targetDate.substr(0, 10)) {
        const icon = weather.weather[0].icon;
        iconCount[icon] = (iconCount[icon] || 0) + 1;
      }
    }
    let mostRepeatedIcon = "";
    let maxCount = 0;
    for (const icon in iconCount) {
      if (iconCount[icon] > maxCount) {
        mostRepeatedIcon = icon;
        maxCount = iconCount[icon];
      }
    }
    return mostRepeatedIcon;
  }

  toggleWeather(date: string, icon: string): void {
    this.activeDate = date;
    this.currentIcon = icon;
  }

  enterCity(): void {
    this.store.dispatch(fetchWeatherByName({ name: this.inputCity }));
  }

  set currentDateTime(value: string) {
    this._currentDateTime = value;
    this.isCurrentDateTimeEmpty = this.currentDateTime !== "";
  }

  get currentDateTime(): string {
    return this._currentDateTime;
  }

  temperatureInCelsius(temp: number) {
    return temp - 273.15;
  }

  isActiveDate(date: string, activeDate: string) {
    return date === activeDate;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
