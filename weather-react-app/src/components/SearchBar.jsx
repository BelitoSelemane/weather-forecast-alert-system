import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (city.trim() === '') return
    onSearch(city)
  }

  return (
    <form className="search-section" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name of city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        aria-label="City name"
      />
      <button type="submit" aria-label="Search weather">Search</button>
    </form>
  )
}

export default SearchBar