function CurrentWeather({ data }) {
  return (
    <div className="current-weather">
      <div className="current-weather-main">
        <div className="current-weather-info">
          <h2 className="city-name">{data.city}</h2>
          <p className="weather-date">{data.date}</p>
          <p className="weather-condition">{data.condition}</p>
        </div>
        <div className="current-weather-temp">
          <img className="weather-icon" src={data.icon} alt={data.condition} />
          <span className="temperature">{data.temperature}°</span>
        </div>
      </div>
      <p className="temp-range">
        H: {data.high}° &nbsp; L: {data.low}°
      </p>
    </div>
  )
}

export default CurrentWeather
