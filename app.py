from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/forest_fire_db'
db = SQLAlchemy(app)

class FireAlert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(80), nullable=False)
    alert_level = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(200), nullable=False)

@app.route('/alerts', methods=['GET'])
def get_alerts():
    # Fetch data from external APIs
    response = requests.get('https://earthdata.nasa.gov/alerts')
    alerts = response.json()
    return jsonify(alerts)

@app.route('/add_alert', methods=['POST'])
def add_alert():
    data = request.get_json()
    new_alert = FireAlert(
        location=data['location'],
        alert_level=data['alert_level'],
        description=data['description']
    )
    db.session.add(new_alert)
    db.session.commit()
    return jsonify({"message": "Alert added successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
