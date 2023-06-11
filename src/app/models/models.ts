export interface IWeather {
  city: {
    coord: {
      lat: number,
      lon: number
    }
    country: string
    id: number,
    name: string,
    population: number,
    sunrise: number,
    sunset: number,
    timezone: number
  },
  cnt: number,
  cod: string,
  list: {
    clouds: { all: 75 },
    dt: number,
    dt_txt: string,
    main: {
      feels_like: number,
      grnd_level: number
      humidity: number
      pressure: number,
      sea_level: number,
      temp: number,
      temp_kf: number,
      temp_max: number,
      temp_min: number
    },
    pop: number,
    sys: {
      pod: string
    },
    visibility: number,
    weather: {
      description: string,
      icon: string,
      id: number,
      main: string
    }[],
    wind: {
      deg: number
      gust: number
      speed: number
    }
  }[],
  message: number
}

export interface IGeolocation {
  lat: number | null,
  lon: number | null
}
