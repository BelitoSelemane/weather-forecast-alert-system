function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <div className="forecast-section">
      {forecast.map((item, index) => (
        <div className="forecast-card" key={index}>
          <p>{item.day}</p>
          <strong>{item.temp}°C</strong>
        </div>
      ))}
    </div>
  )
}

export default Forecast