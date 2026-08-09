import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import AlertBox from '../components/AlertBox'
import Forecast from '../components/Forecast'
import FavoriteCities from '../components/FavoriteCities'
import RealtimeAlerts from '../components/RealtimeAlerts'

const mockWeatherData = {
  temp: 32,
  description: 'Sunny with few clouds',
  humidity: 65,
  windSpeed: 45,
  forecast: [
    { day: 'Tomorrow', temp: 30 },
    { day: 'Day after tomorrow', temp: 29 },
    { day: 'In 3 days', temp: 33 }
  ]
}

function Home() {
  const [weatherData, setWeatherData] = useState(null)

  function handleSearch(city) {
    setWeatherData({ ...mockWeatherData, city })
  }

  return (
    <main className="container">
      <SearchBar onSearch={handleSearch} />
      <WeatherCard data={weatherData} />
      <AlertBox data={weatherData} />
      <Forecast forecast={weatherData?.forecast} />
      <FavoriteCities />
      <RealtimeAlerts />
    </main>
  )
}

export default Home