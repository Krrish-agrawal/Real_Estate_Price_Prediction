import React, { useState, useEffect } from 'react'

export default function RentalYieldCalculator() {
  const [formData, setFormData] = useState({
    purchasePrice: '',
    monthlyRent: '',
    expenses: '10'
  })
  const [yields, setYields] = useState({ gross: 0, net: 0, payback: 0 })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  useEffect(() => {
    const { purchasePrice, monthlyRent, expenses } = formData

    // Validate inputs
    if (purchasePrice === '' || purchasePrice <= 0) {
      setError('Please enter a valid purchase price (> 0).')
      setYields({ gross: 0, net: 0, payback: 0 })
      return
    }
    if (monthlyRent === '' || monthlyRent <= 0) {
      setError('Please enter a valid monthly rent (> 0).')
      setYields({ gross: 0, net: 0, payback: 0 })
      return
    }
    if (expenses < 0 || expenses > 100) {
      setError('Expenses must be between 0% and 100%.')
      setYields({ gross: 0, net: 0, payback: 0 })
      return
    }

    // All valid → compute yields
    const annualRent = monthlyRent * 12
    const grossYield = (annualRent / purchasePrice) * 100
    const netYield = (annualRent * (1 - expenses / 100) / purchasePrice) * 100

    // Payback period = 100 / netYield (only if netYield > 0)
    const payback = netYield > 0 ? (100 / netYield).toFixed(1) : 0

    setYields({
      gross: grossYield.toFixed(2),
      net: netYield.toFixed(2),
      payback
    })
  }, [formData])

  return (
    <div className="form-container">
      <h1>Rental Yield Calculator</h1>

      <div className="form">
        {error && (
          <div className="error-message" role="alert" style={{ color: '#e74c3c', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <label>Purchase Price (₹)</label>
        <input
          type="number"
          name="purchasePrice"
          value={formData.purchasePrice}
          onChange={handleChange}
          className="area"
          placeholder="Enter property purchase price"
          min="0"
        />

        <label>Monthly Rent (₹)</label>
        <input
          type="number"
          name="monthlyRent"
          value={formData.monthlyRent}
          onChange={handleChange}
          className="area"
          placeholder="Enter expected monthly rent"
          min="0"
        />

        <label>Annual Expenses (% of rent)</label>
        <input
          type="number"
          name="expenses"
          value={formData.expenses}
          onChange={handleChange}
          className="area"
          placeholder="Enter annual expenses percentage"
          min="0"
          max="100"
        />
      </div>

      {/* Only show results when valid and non-zero */}
      {!error && yields.net > 0 && (
        <div className="result">
          <h2>Rental Yields & Payback</h2>
          
          <div className="emi-amount">
            Net Yield: {yields.net}%
          </div>
          <div className="emi-amount">
            Payback Period: {yields.payback} years
          </div>
          
        </div>
      )}
    </div>
  )
}
