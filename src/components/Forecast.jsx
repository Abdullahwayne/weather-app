function Forecast({ days }) {
  return (
    <div className="forecast">
      <h3 className="section-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {days.map((day) => (
          <div className="forecast-card" key={day.day}>
            <p className="forecast-day">{day.day}</p>
            <img className="forecast-icon" src={day.icon} alt={day.condition} />
            <p className="forecast-condition">{day.condition}</p>
            <div className="forecast-temps">
              <span className="forecast-high">{day.high}°</span>
              <div className="temp-bar">
                <div
                  className="temp-bar-fill"
                  style={{ width: `${((day.high - day.low) / 30) * 100}%` }}
                />
              </div>
              <span className="forecast-low">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
