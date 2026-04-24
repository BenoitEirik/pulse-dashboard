interface WeatherResponse {
  current: {
    time: string;
    interval: number;
    weather_code: number;
    temperature_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    is_day: number;
  };
  generationtime_ms: number;
}
