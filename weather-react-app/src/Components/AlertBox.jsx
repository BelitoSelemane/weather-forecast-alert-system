function AlertBox({ data }) {
  if (!data) return null

  let message = null

  if (data.temp >= 35) {
    message = '⚠️ Extreme heat alert!'
  } else if (data.windSpeed >= 60) {
    message = '⚠️ Strong wind alert !'
  }

  if (!message) return null

  return <div className="alert-box">{message}</div>
}

export default AlertBox