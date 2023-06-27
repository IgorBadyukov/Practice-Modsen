import { Pipe, PipeTransform } from '@angular/core';
import {IWeatherList} from "../models/weather.model";

@Pipe({
  name: 'feelsTemperature'
})
export class FeelsTemperaturePipe implements PipeTransform {

  transform(weatherList: IWeatherList[], day: string): number {
    const filteredWeather = weatherList.filter(weather => {
      const weatherDay = new Date(weather.dt_txt);
      const currentDay = new Date(day)
      return weatherDay.getDate() === currentDay.getDate();
    });
    if (filteredWeather.length === 0) {
      return 0;
    }
    const maxTemperature = Math.max(...filteredWeather.map(weather => weather.main.feels_like));
    return maxTemperature;
  }

}
