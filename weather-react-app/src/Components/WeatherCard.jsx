function WeatherCard({ data }) {
  if (!data) return null

  return (
    <div className="weather-card">
      <h2>{data.city}</h2>
      <p className="temperature">{data.temp} °C</p>
      <p>{data.description}</p>
      <p>Humidity: {data.humidity} %</p>
      <p>Wind: {data.windSpeed} km/h</p>
    </div>
  )
}

export default WeatherCard