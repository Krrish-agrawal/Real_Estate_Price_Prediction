# server.py

from flask import Flask, request, jsonify
import util

app = Flask(__name__)
util.load_saved_artifacts()

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.form if len(request.form) > 0 else request.json

    sqft     = float(data['total_sqft'])
    location = data['location']
    bhk      = int(data['bhk'])
    bath     = int(data['bath'])

    estimated_price = util.get_estimated_price(location, sqft, bhk, bath)

    response = jsonify({
        'estimated_price': estimated_price
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    app.run(debug=True)
