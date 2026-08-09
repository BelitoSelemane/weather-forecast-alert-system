import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

function RealtimeAlerts() {
    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        socket.on('weatherAlert', (data) => {
            setAlerts((prev) => [data, ...prev].slice(0, 5)) // guarda só os 5 mais recentes
        })

        return () => {
            socket.off('weatherAlert')
        }
    }, [])

    if (alerts.length === 0) {
        return <p className="realtime-status">Waiting for real-time alerts...</p>
    }

    return (
        <div className="realtime-alerts">
            <h3>Live Weather Alerts</h3>
            <ul>
                {alerts.map((alert, index) => (
                    <li key={index}>
                        ⚠️ {alert.message} <small>({new Date(alert.time).toLocaleTimeString()})</small>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RealtimeAlerts