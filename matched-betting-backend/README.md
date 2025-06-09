# Matched Betting Backend API

A Flask-based API for matched betting calculations and predictions.

## Setup

1. Create a virtual environment (recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the application:
   ```
   python app.py
   ```

The API will be available at http://localhost:8000

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Predictions
- `POST /api/predict_match` - Predict match outcome and possible scores
  - Body: `{"match_id": "Milan-Inter", "providers": ["Bet365", "Betfair"]}`

### Value Betting
- `POST /api/identify_value_bet` - Identify value betting opportunities
  - Body: `{"match_id": "Milan-Inter", "providers": ["Bet365", "Betfair"], "our_probs": {"home": 0.55}}`

### Data
- `GET /api/odds_data?match_id=Milan-Inter&providers=Bet365,Betfair` - Get odds data for a match

### Logs
- `GET /api/logs?lines=10` - Get the latest log entries