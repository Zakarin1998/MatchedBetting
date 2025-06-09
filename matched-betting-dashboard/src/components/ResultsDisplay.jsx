import React from 'react';

// Simple Results Display Component
const ResultsDisplay = ({ result }) => {
  if (!result) {
    return (
      <div className="alert alert-info">
        <p><strong>No results yet</strong></p>
        <p>Run an analysis using the calculator above to see predictions and value bets.</p>
      </div>
    );
  }

  const { pred, vb, matchId, providers } = result;

  return (
    <div className="card" id="value-bets">
      <div className="card-header">
        <div>
          <h2 className="card-title">Prediction Results</h2>
          <div className="card-subtitle">Match: {matchId} • Providers: {providers.join(', ')}</div>
        </div>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
          <div>
            <div className="mb-4">
              <h3 className="mb-2">Predicted Outcome</h3>
              <div className="tag" style={{ backgroundColor: 'var(--success)', color: 'white' }}>
                {pred[0]}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="mb-2">Possible Scores</h3>
              <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                {pred[1].map((score, idx) => (
                  <div key={idx} className="tag">
                    {score}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-2">Value Bet Recommendation</h3>
              <div className="alert alert-success">
                {vb}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="mb-2" style={{ textAlign: 'center' }}>Outcome Probability Distribution</h3>
            <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              <p>Home Win: 55%</p>
              <p>Draw: 25%</p>
              <p>Away Win: 20%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;