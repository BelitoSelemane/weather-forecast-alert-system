import { useState, useEffect } from 'react'
import axios from 'axios'

function FavoriteCities() {
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchCities()
    }, [])

    async function fetchCities() {
        try {
            const response = await axios.get('http://localhost:5000/api/cities')
            setCities(response.data)
            setLoading(false)
        } catch (err) {
            setError('Failed to load favorite cities')
            setLoading(false)
        }
    }

    if (loading) return <p>Loading favorite cities...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="favorite-cities">
            <h3>Favorite Cities</h3>
            <ul>
                {cities.map((city) => (
                    <li key={city.id}>{city.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default FavoriteCities