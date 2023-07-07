import { Pipe, PipeTransform } from '@angular/core';
import { IWeatherList } from '../models/weather-list.model';

@Pipe({
  name: 'maxTemperature',
})
export class MaxTemperaturePipe implements PipeTransform {
  transform(weatherList: IWeatherList[], day: string): number {
    const filteredWeather = weatherList.filter((weather) => {
      const weatherDay = new Date(weather.dt_txt);
      const currentDay = new Date(day);
      return weatherDay.getDate() === currentDay.getDate();
    });
    if (filteredWeather.length === 0) {
      return 0;
    }
    const maxTemperature = Math.max(...filteredWeather.map((weather) => weather.main.temp_max));
    return maxTemperature;
  }
}
