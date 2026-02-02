const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

export async function fetchWeather(city) {
  const res = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=6&aqi=no`
  )

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(error?.error?.message || 'Failed to fetch weather data')
  }

  const data = await res.json()
  return transformWeatherData(data)
}

export async function searchLocations(query) {
  if (!query || query.length < 2) return []

  const res = await fetch(
    `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
  )

  if (!res.ok) return []

  const data = await res.json()
  return data.map((loc) => ({
    name: loc.name,
    region: loc.region,
    country: loc.country,
    label: [loc.name, loc.region, loc.country].filter(Boolean).join(', '),
  }))
}

function getDayName(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

function formatDate(localtime) {
  const date = new Date(localtime)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function transformWeatherData(data) {
  const { location, current, forecast } = data
  const today = forecast.forecastday[0]

  const weather = {
    city: location.name,
    date: formatDate(location.localtime),
    condition: current.condition.text,
    icon: `https:${current.condition.icon}`,
    temperature: Math.round(current.temp_c),
    high: Math.round(today.day.maxtemp_c),
    low: Math.round(today.day.mintemp_c),
  }

  const details = {
    feelsLike: Math.round(current.feelslike_c),
    humidity: current.humidity,
    wind: Math.round(current.wind_kph),
    visibility: current.vis_km,
    pressure: current.pressure_mb,
    uvIndex: current.uv,
  }

  const forecastDays = forecast.forecastday.slice(1).map((day) => ({
    day: getDayName(day.date),
    icon: `https:${day.day.condition.icon}`,
    condition: day.day.condition.text,
    high: Math.round(day.day.maxtemp_c),
    low: Math.round(day.day.mintemp_c),
  }))

  return { weather, details, forecast: forecastDays }
}
