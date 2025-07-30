import React, { useState } from 'react'

export default function MortgageCalculator() {
  const [formData, setFormData] = useState({
    propertyPrice: '',
    downPayment: '',
    interestRate: '',
    loanTerm: '20'
  })
  const [emi, setEmi] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // clear previous error as soon as user starts typing
    setError('')
  }

  const calculateEMI = () => {
    const { propertyPrice, downPayment, interestRate, loanTerm } = formData

    // Validation
    if (!propertyPrice || propertyPrice <= 0) {
      setError('Please enter a valid property price (greater than 0).')
      return
    }
    if (downPayment === '' || downPayment < 0 || downPayment > 100) {
      setError('Down payment must be between 0% and 100%.')
      return
    }
    if (!interestRate || interestRate <= 0) {
      setError('Please enter a valid annual interest rate (greater than 0).')
      return
    }
    if (!loanTerm || loanTerm <= 0) {
      setError('Please enter a valid loan term in years (greater than 0).')
      return
    }

    // All good → calculate
    const P = propertyPrice * 1e5 * (1 - downPayment / 100) // convert lakhs → rupees
    const r = (interestRate / 12) / 100                    // monthly rate
    const n = loanTerm * 12                                // total months

    const emiCalc = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    setEmi(Math.round(emiCalc))
  }

  return (
    <div className="form-container">
      <h1>Mortgage Calculator</h1>

      <div className="form">
        {error && (
          <div className="error-message" role="alert" style={{ color: '#e74c3c', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <label>Property Price (in Lakhs)</label>
        <input
          className="area"
          type="number"
          name="propertyPrice"
          value={formData.propertyPrice}
          onChange={handleChange}
          placeholder="Enter property price"
        />

        <label>Down Payment (%)</label>
        <input
          className="area"
          type="number"
          name="downPayment"
          value={formData.downPayment}
          onChange={handleChange}
          placeholder="Enter down payment percentage"
        />

        <label>Annual Interest Rate (%)</label>
        <input
          className="area"
          type="number"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleChange}
          placeholder="Enter interest rate"
          step="0.1"
        />

        <label>Loan Term (Years)</label>
        <input
          className="area"
          type="number"
          name="loanTerm"
          value={formData.loanTerm}
          onChange={handleChange}
          placeholder="Enter loan term"
        />

        <button className="submit" onClick={calculateEMI}>
          Calculate EMI
        </button>
      </div>

      {emi !== null && !error && (
        <div className="result">
          <h2>Monthly EMI</h2>
          <p className="emi-amount">₹{emi.toLocaleString('en-IN')}</p>
         
        </div>
      )}
    </div>
  )
}
