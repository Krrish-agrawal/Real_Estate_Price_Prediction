import React from 'react'
import '../styles/About.css'

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        
        <section className="info-card">
          <h2>Project Overview</h2>
          <p>
            Our Bangalore House Price Prediction platform empowers buyers, sellers, and investors 
            to make data-driven decisions in the real estate market. Using advanced machine 
            learning algorithms, we analyze various factors including location, size, and area 
            to provide accurate price estimates for properties across Bangalore.
          </p>
        </section>

        <section className="info-card features-grid">
          <h2>Key Features</h2>
          <div className="features-container">
            <div className="feature-item">
              <h3>Price Prediction</h3>
              <p>ML-powered accurate price estimates based on property specifications</p>
            </div>
            <div className="feature-item">
              <h3>Mortgage Calculator</h3>
              <p>Plan your financing with our EMI calculator</p>
            </div>
            <div className="feature-item">
              <h3>Rental Yield</h3>
              <p>Calculate potential returns on your investment</p>
            </div>
            
          </div>
        </section>

        <section className="info-card">
          <h2>Technology Stack</h2>
          <div className="tech-list">
            <div className="tech-item">
              <h3>Frontend</h3>
              <p>React.js (Vite)</p>
            </div>
            <div className="tech-item">
              <h3>Backend</h3>
              <p>Flask (Python)</p>
            </div>
            <div className="tech-item">
              <h3>ML Model</h3>
              <p>scikit-learn</p>
            </div>
            <div className="tech-item">
              <h3>Deployment</h3>
              <p>Render</p>
            </div>
          </div>
        </section>

        <section className="info-card">
          <h2>Future Scope</h2>
          <div className="future-features">
            <div className="future-item">
              <h3>Price Heatmaps</h3>
              <p>Visual representation of property prices across Bangalore</p>
            </div>
            <div className="future-item">
              <h3>Rent vs Buy Analysis</h3>
              <p>Comprehensive comparison tool for better decision making</p>
            </div>
            <div className="future-item">
              <h3>Price Trends</h3>
              <p>Historical price trends and future appreciation analysis</p>
            </div>
          </div>
        </section>

        <section className="info-card cta-section">
          <h2>Get Started</h2>
          <p>Ready to explore the Bangalore real estate market? Try our price prediction tool today and make informed property decisions!</p>
        </section>
      </div>
    </div>
  )
}
