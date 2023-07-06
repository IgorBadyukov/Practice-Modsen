import { Pipe, PipeTransform } from '@angular/core';
import { IWeatherList } from '../models/weather-list.model';
import { WeatherInfo } from '../models/weather-info.model';

@Pipe({
  name: 'weekWeather',
})
export class WeekWeatherPipe implements PipeTransform {
  transform(weatherList: IWeatherList[]): WeatherInfo[] {
    const weatherInfoByDay: { [key: string]: WeatherInfo } = {};
    weatherList.forEach((weatherItem) => {
      const date = weatherItem.dt_txt.split(' ')[0];
      if (!weatherInfoByDay[date]) {
        weatherInfoByDay[date] = {
          date: date,
          maxTemperature: Number.MIN_SAFE_INTEGER,
          mostFrequentIcon: '',
          iconCount: {},
        };
      }
      if (weatherItem.main.temp > weatherInfoByDay[date].maxTemperature) {
        weatherInfoByDay[date].maxTemperature = weatherItem.main.temp;
      }
      const icon = weatherItem.weather[0].icon;
      if (!weatherInfoByDay[date].iconCount[icon]) {
        weatherInfoByDay[date].iconCount[icon] = 0;
      }
      weatherInfoByDay[date].iconCount[icon]++;
    });
    const weatherInfoArray: WeatherInfo[] = [];
    for (const date in weatherInfoByDay) {
      if (weatherInfoByDay.hasOwnProperty(date)) {
        const weatherInfo = weatherInfoByDay[date];
        let maxCount = 0;
        let mostFrequentIcon = '';
        for (const icon in weatherInfo.iconCount) {
          if (weatherInfo.iconCount.hasOwnProperty(icon)) {
            const count = weatherInfo.iconCount[icon];
            if (count > maxCount) {
              maxCount = count;
              mostFrequentIcon = icon;
            }
          }
        }
        weatherInfo.mostFrequentIcon = mostFrequentIcon;
        weatherInfoArray.push(weatherInfo);
      }
    }
    return weatherInfoArray;
  }
}
