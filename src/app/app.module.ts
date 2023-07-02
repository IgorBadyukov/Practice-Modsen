import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { MainWindowComponent } from "./components/main-window/main-window.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { weatherReducer } from "./store/reducers/weather.reducer";
import { WeatherEffect } from "./store/effects/weather.effect";
import { CommonModule, DecimalPipe } from "@angular/common";
import { GeolocationEffect } from "./store/effects/geolocation.effect";
import { geolocationReducer } from "./store/reducers/geolocation.reducer";
import { CacheInterceptor } from "./interceptors/cache.interceptor";
import { TimePipe } from "./pipes/time.pipe";
import { DatePipe } from "./pipes/date.pipe";
import { CurrentWeatherPipe } from "./pipes/current-weather.pipe";
import { WeekWeatherPipe } from "./pipes/week-weather.pipe";
import { DayNamePipe } from "./pipes/day-name.pipe";
import { BackgroundWeatherDirective } from "./directives/background-weather.directive";
import { ModalErrorComponent } from "./components/modal-error/modal-error.component";
import { AveragePressurePipe } from "./pipes/average-pressure.pipe";
import { FeelsTemperaturePipe } from "./pipes/feels-temperature.pipe";
import { WindSpeedPipe } from "./pipes/wind-speed.pipe";
import { MaxTemperaturePipe } from "./pipes/max-temperature.pipe";
import { AverageCloudsPipe } from "./pipes/average-clouds.pipe";
import { RoundPipePipe } from "./pipes/round-pipe.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    TimePipe,
    DatePipe,
    CurrentWeatherPipe,
    WeekWeatherPipe,
    DayNamePipe,
    BackgroundWeatherDirective,
    ModalErrorComponent,
    AveragePressurePipe,
    FeelsTemperaturePipe,
    WindSpeedPipe,
    MaxTemperaturePipe,
    AverageCloudsPipe,
    RoundPipePipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      { weather: weatherReducer, geolocation: geolocationReducer },
      {}
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([WeatherEffect, GeolocationEffect]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
