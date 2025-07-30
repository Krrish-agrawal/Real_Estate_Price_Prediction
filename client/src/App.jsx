import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import About from './pages/About'
import Predict from './pages/Predict'
import MortgageCalculator from './pages/MortgageCalculator'
import RentalYieldCalculator from './pages/RentalYieldCalculator'
import './index.css'
import './styles/App.css'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <div className="img" />
          <Routes>
            <Route path="/" element={<Predict />} />
            <Route path="/mortgage" element={<MortgageCalculator />} />
            <Route path="/rental" element={<RentalYieldCalculator />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
