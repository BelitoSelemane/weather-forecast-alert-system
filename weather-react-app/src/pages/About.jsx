import hero from '../assets/hero.png'

function About() {
  return (
    <main className="container">
      <h2>About this project</h2>
      <img
                src={hero}
                alt="Weather illustration"
                loading="lazy"
                width="400"
                height="300"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', margin: '16px 0' }}
            />
      <p>
        The Weather Forecast & Alert System is a web application built with
        React.js that allows users to search for current weather conditions
        and forecasts for any city, while displaying automatic alerts for
        dangerous weather conditions.
      </p>
      <p>
        This project was developed as part of the SkillDzire Web Development
        & Cloud Integration internship program.
      </p>
    </main>
  )
}

export default About