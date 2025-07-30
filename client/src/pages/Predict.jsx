import React, { useState, useEffect } from 'react'
import SwitchField from '../components/SwitchField'

export default function Predict() {
  const [locations, setLocations] = useState([])
  const [sqft, setSqft] = useState('1000')
  const [bhk, setBhk] = useState(2)
  const [bath, setBath] = useState(2)
  const [loc, setLoc] = useState('')
  const [price, setPrice] = useState(null)

  useEffect(() => {
    fetch('https://real-estate-price-prediction-q14x.onrender.com/get_location_names')
      .then(res => res.json())
      .then(data => setLocations(data.locations))
      .catch(console.error)
  }, [])

  const estimatePrice = async () => {
    const sqftNum = parseFloat(sqft)
    if (isNaN(sqftNum) || sqftNum < 300 || sqftNum > 10000) {
      return alert('Please enter a valid area between 300 and 10000 sq ft.')
    }
    if (!loc) {
      return alert('Please select a location.')
    }

    setPrice('Estimating...')
    const requestData = { total_sqft: sqftNum, bhk, bath, location: loc }

    try {
      const response = await fetch(
        'https://real-estate-price-prediction-q14x.onrender.com/predict_home_price',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestData)
        }
      )
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      if (data.estimated_price != null) {
        setPrice(`${data.estimated_price} Lakh`)
      } else {
        throw new Error('No `estimated_price` in response')
      }
    } catch (err) {
      console.error('❌ estimatePrice error:', err)
      setPrice('Error: ' + err.message)
    }
  }

  return (
    <div className="form-container">
      <h1>Banglore Home Price Prediction</h1>
      <div className="form">
        <label htmlFor="uiSqft">Area (Square Feet)</label>
        <input
          id="uiSqft"
          className="area"
          type="text"
          value={sqft}
          onChange={e => setSqft(e.target.value)}
        />

        <h2>BHK</h2>
        <SwitchField
          name="uiBHK"
          options={[1, 2, 3, 4, 5]}
          selected={bhk}
          onChange={setBhk}
        />

        <h2>Bath</h2>
        <SwitchField
          name="uiBathrooms"
          options={[1, 2, 3, 4, 5]}
          selected={bath}
          onChange={setBath}
        />

        <label htmlFor="uiLocations">Location</label>
        <select
          id="uiLocations"
          className="location"
          value={loc}
          onChange={e => setLoc(e.target.value)}
        >
          <option value="" disabled>Choose a Location</option>
          {locations.map((l, i) => (
            <option key={i} value={l}>{l}</option>
          ))}
        </select>

        <button className="submit" onClick={estimatePrice}>
          Estimate Price
        </button>
      </div>

      <div className="result" id="uiEstimatedPrice">
        <h2>{price || 'Estimated Price'}</h2>
      </div>
    </div>
  )
}