import { Pipe, PipeTransform } from '@angular/core';
import { IWeatherList } from '../models/weather-list.model';

@Pipe({
  name: 'windSpeed',
})
export class WindSpeedPipe implements PipeTransform {
  transform(weatherList: IWeatherList[], day: string): number {
    const filteredWeather = weatherList.filter((weather) => {
      const weatherDay = new Date(weather.dt_txt);
      const currentDay = new Date(day);
      return weatherDay.getDate() === currentDay.getDate();
    });
    if (filteredWeather.length === 0) {
      return 0;
    }
    const totalPressure = filteredWeather.reduce((sum, weather) => sum + weather.wind.speed, 0);
    const averagePressure = totalPressure / filteredWeather.length;
    return averagePressure;
  }
}
