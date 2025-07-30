# Real Estate Price Prediction

A web application for predicting real estate prices in Bengaluru using a machine learning model. This repository contains the client (frontend), model artifacts, and server (backend) code required to train, serve, and deploy the application. 

## Table of Contents

1. [Features](#features)  
2. [Repository Structure](#repository-structure)  
3. [Prerequisites](#prerequisites)  
4. [Installation](#installation)  
5. [Usage](#usage)   
   - [Running the Server](#running-the-server)  
   - [Accessing the Frontend](#accessing-the-frontend)  
6. [API Endpoints](#api-endpoints)  
7. [Contributing](#contributing)  


## Features

- **Accurate Price Prediction**  
  Predicts per-square-foot prices for Bengaluru localities using a pre-trained regression model.  
- **Interactive Frontend**  
  Responsive UI built with HTML, CSS, and vanilla JavaScript.  
- **REST API**  
  Flask server exposing endpoints for retrieving supported locations and predicting house prices.  
- **Model Artifacts**  
  Includes serialized model (`.pickle`) and feature columns JSON.  


## Repository Structure

```text
Real_Estate_Price_Prediction/
├── client/                  # Frontend application
│   ├── index.html          # Main HTML page
│   ├── app.css             # Stylesheet
│   └── app.js              # JavaScript logic
├── model/                   # Model training artifacts
│   ├── bhp.ipynb           # Jupyter notebook for data cleaning, feature engineering, and training
│   ├── banglore_home_prices_model.pickle  # Trained regression model
│   └── columns.json        # JSON file listing model input features
├── server/                  # Backend application
│   ├── artifacts/          # Model artifacts for serving
│   │   ├── banglore_home_prices_model.pickle
│   │   └── columns.json
│   ├── server.py           # Flask application exposing REST API
│   ├── util.py             # Utility functions for loading model and JSON
│   └── requirements.txt    # Python dependencies
├── .gitignore               # Common exclusions
└── README.md                # Project documentation (you are here)
```

## Prerequisites

- **Python 3.9+**  
- **pip** (Python package manager)  
- **git**

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Krrish-agrawal/Real_Estate_Price_Prediction.git
   cd Real_Estate_Price_Prediction
   ```

2. **Set up a Python virtual environment**  
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install backend dependencies**  
   ```bash
   pip install -r server/requirements.txt
   ```


## Usage

### Running the Server

Start the Flask backend:

```bash
cd server
source ../venv/bin/activate
python server.py
```

By default, the API listens on `http://0.0.0.0:5000/`.

### Accessing the Frontend

Open `client/index.html` in your browser. Ensure the backend is running at `http://localhost:5000/`. The UI allows you to:

1. Select BHK, bath count, total area, and locality.
2. Click **Predict Price** to view the estimated price.

## API Endpoints

| Endpoint                      | Method | Description                                  | Request Body / Params                                         |
|-------------------------------|--------|----------------------------------------------|---------------------------------------------------------------|
| **/get_location_names**       | GET    | Returns list of supported localities         | None                                                          |
| **/predict_home_price**       | POST   | Predicts house price based on input features | JSON: `{ "total_sqft": float, "bhk": int, "bath": int, "location": str }` |



## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request. Ensure code formatting follows PEP8 and JavaScript best practices.

