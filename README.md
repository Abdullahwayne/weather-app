# Weather App

A weather dashboard built with React + Vite that displays current weather, 5-day forecast, and weather details using the [WeatherAPI.com](https://www.weatherapi.com/) API. Features a search bar with debounced city autocomplete.

## Features

- Current weather with temperature, condition, and high/low range
- 6 weather detail cards (feels like, humidity, wind, visibility, pressure, UV index)
- 5-day forecast with temperature range bars
- City search with autocomplete suggestions
- Dark glassmorphic UI, fully responsive

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abdullahwayne/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your API key**

   Create a `.env` file in the project root:

   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/
│   └── weather.js          # WeatherAPI.com service (fetch + autocomplete)
├── components/
│   ├── SearchBar.jsx        # Search input with autocomplete dropdown
│   ├── CurrentWeather.jsx   # Current weather card
│   ├── WeatherDetails.jsx   # Detail cards grid
│   └── Forecast.jsx         # 5-day forecast list
├── App.jsx                  # Main app component
├── App.css                  # All styles
├── index.css                # Root styles
└── main.jsx                 # Entry point
```

## API Reference

This app uses two WeatherAPI.com endpoints:

- **Forecast** (`/v1/forecast.json`) — current weather + multi-day forecast
- **Search** (`/v1/search.json`) — city autocomplete suggestions
