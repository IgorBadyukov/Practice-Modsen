export interface WeatherInfo {
  date: string;
  maxTemperature: number;
  mostFrequentIcon: string;
  iconCount: { [key: string]: number };
}
