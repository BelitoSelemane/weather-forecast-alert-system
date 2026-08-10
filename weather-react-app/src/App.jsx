import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>🌦️ Weather Forecast & Alert System</h1>
          <nav nav aria-label="Main navigation">
            <Link to="/">Home</Link>
            {' | '}
            <Link to="/about">About</Link>
          </nav>
        </header>

        <Suspense fallback={<p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>}>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
    </Routes>
       </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App