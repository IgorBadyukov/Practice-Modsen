import { Pipe, PipeTransform } from '@angular/core';
import {IWeatherList} from "../models/models";

@Pipe({
  name: 'currentWeather'
})
export class CurrentWeatherPipe implements PipeTransform {

  transform(weather: IWeatherList[], date: string): IWeatherList[] {
    return weather.filter((weatherItem: IWeatherList) => {
      const weatherDate = new Date(weatherItem.dt_txt);
      const currentDate = new Date(date);
      return currentDate.getDate() === weatherDate.getDate();
    });
  }

}
