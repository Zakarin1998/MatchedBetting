from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import logging
import os
from datetime import datetime
import json
import requests
import pandas as pd

# Import our engine components
from engine.prediction import predict_match
from engine.value_bet import identify_value_bet
from engine.data import unify_data
from custom_logger import setup_logger

# Setup logger
LOG_NAME = "matched_betting_api"
logger = setup_logger(LOG_NAME, level=logging.INFO)

# Create Flask app
app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "*"}})  # Enable CORS for all API routes

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    logger.info("Health check request received")
    return jsonify({
        "status": "ok",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/predict_match', methods=['POST'])
def api_predict_match():
    """
    Endpoint to predict match outcome and scores
    
    Expected JSON body:
    {
        "match_id": "Milan-Inter",
        "providers": ["Bet365", "Betfair"]
    }
    """
    try:
        data = request.json
        
        # Validate request
        if not data or 'match_id' not in data or 'providers' not in data:
            logger.warning("Invalid request received for predict_match")
            return jsonify({
                "error": "Invalid request. Required fields: match_id, providers"
            }), 400
        
        match_id = data['match_id']
        providers = data['providers']
        
        logger.info(f"Request to predict match: {match_id}")
        logger.info(f"Using providers: {providers}")
        
        # Call prediction function
        outcome, scores = predict_match(match_id, providers, logger)
        
        # Return prediction
        return jsonify([outcome, scores])
        
    except Exception as e:
        logger.error(f"Error predicting match: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500

@app.route('/api/identify_value_bet', methods=['POST'])
def api_identify_value_bet():
    """
    Endpoint to identify value bets
    
    Expected JSON body:
    {
        "match_id": "Milan-Inter",
        "providers": ["Bet365", "Betfair"],
        "our_probs": {"home": 0.55, "draw": 0.25, "away": 0.2}
    }
    """
    try:
        data = request.json
        
        # Validate request
        if not data or 'match_id' not in data or 'providers' not in data or 'our_probs' not in data:
            logger.warning("Invalid request received for identify_value_bet")
            return jsonify({
                "error": "Invalid request. Required fields: match_id, providers, our_probs"
            }), 400
        
        match_id = data['match_id']
        providers = data['providers']
        our_probs = data['our_probs']
        
        logger.info(f"Request to identify value bet: {match_id}")
        logger.debug(f"Using providers: {providers}")
        logger.debug(f"Our probabilities: {our_probs}")
        
        # Call value bet function
        value_bet = identify_value_bet(match_id, providers, our_probs, logger)
        
        # Return value bet
        return jsonify(value_bet)
        
    except Exception as e:
        logger.error(f"Error identifying value bet: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500

@app.route('/api/odds_data', methods=['GET'])
def get_odds_data():
    """
    Endpoint to get odds data for a match
    
    Query parameters:
    - match_id: Match identifier
    - providers: Comma-separated list of providers
    """
    try:
        match_id = request.args.get('match_id', 'Milan-Inter')
        providers_str = request.args.get('providers', 'Bet365,Betfair')
        providers = providers_str.split(',')
        
        logger.info(f"Request for odds data: {match_id}")
        logger.debug(f"Using providers: {providers}")
        
        # Fetch unified data
        df = unify_data(match_id, providers)
        
        # Convert to dict for JSON response
        odds_data = df.to_dict(orient='records')
        
        return jsonify(odds_data)
        
    except Exception as e:
        logger.error(f"Error fetching odds data: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500

@app.route('/api/logs', methods=['GET'])
def get_logs():
    """
    Endpoint to get the latest log entries
    
    Query parameters:
    - lines: Number of lines to return (default: 10)
    """
    try:
        lines = int(request.args.get('lines', 10))
        
        logger.info(f"Request for logs, lines={lines}")
        
        # Get the most recent log file
        log_dir = "logs"
        log_files = [f for f in os.listdir(log_dir) if f.startswith(LOG_NAME)]
        
        if not log_files:
            logger.warning("No log files found")
            return jsonify([])
        
        # Sort by modification time (most recent first)
        latest_log = sorted(
            log_files,
            key=lambda x: os.path.getmtime(os.path.join(log_dir, x)),
            reverse=True
        )[0]
        
        # Read the latest lines
        log_path = os.path.join(log_dir, latest_log)
        with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
            log_lines = f.readlines()[-lines:]
        
        # Strip newlines
        log_lines = [line.strip() for line in log_lines]
        
        return jsonify(log_lines)
        
    except Exception as e:
        logger.error(f"Error fetching logs: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500
    

@app.route('/fetch-and-save', methods=['GET'])
def fetch_and_save():
    try:
        # Chiamata all'API esterna
        url = 'https://www.eurobet.it/detail-service/sport-schedule/services/meeting/calcio/it-serie-a?prematch=1&live=0'
        response = requests.get(url)
        response.raise_for_status()  # Lancia eccezione se la risposta è un errore

        # Scrive i dati nel file JSON
        with open('response.json', 'w', encoding='utf-8') as f:
            json.dump(response.json(), f, indent=2, ensure_ascii=False)

        return jsonify({'message': 'Dati salvati con successo!'}), 200

    except requests.exceptions.RequestException as e:
        print(f"Errore nella richiesta: {e}")
        return jsonify({'error': 'Errore durante la richiesta'}), 500

    except Exception as e:
        print(f"Errore generico: {e}")
        return jsonify({'error': 'Errore interno del server'}), 500

if __name__ == '__main__':
    # Ensure logs directory exists
    if not os.path.exists('logs'):
        os.makedirs('logs')
    
    logger.info("=== Starting Matched Betting API Server ===")
    app.run(host='0.0.0.0', port=8000, debug=True)