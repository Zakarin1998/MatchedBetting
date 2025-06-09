import React, { useState } from 'react';
import { predictMatch, identifyValueBet } from '../services/api';

// Simple Calculator Component
const Calculator = ({ onResultUpdate }) => {
  const [matchId, setMatchId] = useState('Milan-Inter');
  const [providers, setProviders] = useState('Bet365,Betfair');
  const [homeProb, setHomeProb] = useState(0.55);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRun = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const provArr = providers.split(',').map(p => p.trim());
      
      // Run predictions
      const pred = await predictMatch(matchId, provArr);
      
      // Run value bet identification
      const vb = await identifyValueBet(matchId, provArr, { home: parseFloat(homeProb) });
      
      // Update parent component with results
      onResultUpdate({ 
        pred: pred.data, 
        vb: vb.data,
        matchId,
        providers: provArr
      });
    } catch (error) {
      console.error('Error running prediction:', error);
      setError(error.response?.data?.error || 'Failed to run prediction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card" id="calculator">
      <div className="card-header">
        <div>
          <h2 className="card-title">Match Prediction Calculator</h2>
          <div className="card-subtitle">Enter match details to calculate predictions and value bets</div>
        </div>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label className="form-label">Match ID</label>
          <input
            className="form-input"
            value={matchId}
            onChange={(e) => setMatchId(e.target.value)}
            placeholder="e.g. Milan-Inter"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Betting Providers</label>
          <input
            className="form-input"
            value={providers}
            onChange={(e) => setProviders(e.target.value)}
            placeholder="Comma-separated list e.g. Bet365,Betfair"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Home Win Probability</label>
          <input
            className="form-input"
            value={homeProb}
            onChange={(e) => setHomeProb(e.target.value)}
            type="number"
            step="0.01"
            min="0"
            max="1"
            placeholder="Enter probability between 0 and 1"
          />
        </div>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-primary"
            onClick={handleRun}
            disabled={isLoading}
          >
            {isLoading ? "Calculating..." : "Run Analysis"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;