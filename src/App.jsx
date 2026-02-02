import { useState, useEffect } from 'react'
import { fetchWeather } from './api/weather'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import WeatherDetails from './components/WeatherDetails'
import Forecast from './components/Forecast'
import './App.css'

function App() {
  const [city, setCity] = useState('San Francisco')
  const [weather, setWeather] = useState(null)
  const [details, setDetails] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadWeather(city)
  }, [])

  async function loadWeather(query) {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeather(query)
      setWeather(data.weather)
      setDetails(data.details)
      setForecast(data.forecast)
      setCity(data.weather.city)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query) => {
    loadWeather(query)
  }

  return (
    <div className="weather-app">
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <div className="loading">
          <div className="spinner" />
          <p>Fetching weather data...</p>
        </div>
      )}
      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={() => loadWeather(city)}>Try Again</button>
        </div>
      )}
      {!loading && !error && weather && (
        <>
          <CurrentWeather data={weather} />
          <WeatherDetails data={details} />
          <Forecast days={forecast} />
        </>
      )}
    </div>
  )
}

export default App
