// urls from https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c

export const useWeatherIcon = (code: number | undefined, isDay: number = 1) => {
  if (code === undefined) return 'https://openweathermap.org/img/wn/03d@2x.png'

  const period = isDay === 1 ? 'day' : 'night'

  const mapping: Record<number, { day: string, night: string }> = {
    0: { day: 'https://openweathermap.org/img/wn/01d@2x.png', night: 'https://openweathermap.org/img/wn/01n@2x.png' },
    1: { day: 'https://openweathermap.org/img/wn/01d@2x.png', night: 'https://openweathermap.org/img/wn/01n@2x.png' },
    2: { day: 'https://openweathermap.org/img/wn/02d@2x.png', night: 'https://openweathermap.org/img/wn/02n@2x.png' },
    3: { day: 'https://openweathermap.org/img/wn/03d@2x.png', night: 'https://openweathermap.org/img/wn/03n@2x.png' },
    45: { day: 'https://openweathermap.org/img/wn/50d@2x.png', night: 'https://openweathermap.org/img/wn/50n@2x.png' },
    48: { day: 'https://openweathermap.org/img/wn/50d@2x.png', night: 'https://openweathermap.org/img/wn/50n@2x.png' },
    51: { day: 'https://openweathermap.org/img/wn/09d@2x.png', night: 'https://openweathermap.org/img/wn/09n@2x.png' },
    53: { day: 'https://openweathermap.org/img/wn/09d@2x.png', night: 'https://openweathermap.org/img/wn/09n@2x.png' },
    55: { day: 'https://openweathermap.org/img/wn/09d@2x.png', night: 'https://openweathermap.org/img/wn/09n@2x.png' },
    61: { day: 'https://openweathermap.org/img/wn/10d@2x.png', night: 'https://openweathermap.org/img/wn/10n@2x.png' },
    63: { day: 'https://openweathermap.org/img/wn/10d@2x.png', night: 'https://openweathermap.org/img/wn/10n@2x.png' },
    65: { day: 'https://openweathermap.org/img/wn/10d@2x.png', night: 'https://openweathermap.org/img/wn/10n@2x.png' },
    66: { day: 'https://openweathermap.org/img/wn/13d@2x.png', night: 'https://openweathermap.org/img/wn/13n@2x.png' },
    67: { day: 'https://openweathermap.org/img/wn/13d@2x.png', night: 'https://openweathermap.org/img/wn/13n@2x.png' },
    71: { day: 'https://openweathermap.org/img/wn/13d@2x.png', night: 'https://openweathermap.org/img/wn/13n@2x.png' },
    73: { day: 'https://openweathermap.org/img/wn/13d@2x.png', night: 'https://openweathermap.org/img/wn/13n@2x.png' },
    75: { day: 'https://openweathermap.org/img/wn/13d@2x.png', night: 'https://openweathermap.org/img/wn/13n@2x.png' },
    80: { day: 'https://openweathermap.org/img/wn/09d@2x.png', night: 'https://openweathermap.org/img/wn/09n@2x.png' },
    81: { day: 'https://openweathermap.org/img/wn/09d@2x.png', night: 'https://openweathermap.org/img/wn/09n@2x.png' },
    82: { day: 'https://openweathermap.org/img/wn/09d@2x.png', night: 'https://openweathermap.org/img/wn/09n@2x.png' },
    95: { day: 'https://openweathermap.org/img/wn/11d@2x.png', night: 'https://openweathermap.org/img/wn/11n@2x.png' },
    96: { day: 'https://openweathermap.org/img/wn/11d@2x.png', night: 'https://openweathermap.org/img/wn/11n@2x.png' },
    99: { day: 'https://openweathermap.org/img/wn/11d@2x.png', night: 'https://openweathermap.org/img/wn/11n@2x.png' },
  }

  return mapping[code]?.[period] || 'https://openweathermap.org/img/wn/03d@2x.png'
}