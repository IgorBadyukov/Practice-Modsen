import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MainWindowComponent } from './components/main-window/main-window.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {weatherReducer} from "./store/reducers/weather.reducer";
import {WeatherEffect} from "./store/effects/weather.effect";
import {CommonModule, DecimalPipe} from "@angular/common";
import {GeolocationEffect} from "./store/effects/geolocation.effect";
import {geolocationReducer} from "./store/reducers/geolocation.reducer";
import {CacheInterceptor} from "./interceptors/cache.interceptor";
import { TimePipe } from './pipes/time.pipe';
import { DatePipe } from './pipes/date.pipe';
import { CurrentWeatherPipe } from './pipes/current-weather.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    TimePipe,
    DatePipe,
    CurrentWeatherPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({weather: weatherReducer, geolocation: geolocationReducer},{}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([WeatherEffect, GeolocationEffect]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  }, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
