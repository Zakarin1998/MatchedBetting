import React, { useState, useEffect } from 'react';
import { predictMatch, identifyValueBet, getLogs } from '../services/api';

// Simple Stat Card Component
const StatCard = ({ label, value, helpText, icon }) => {
  return (
    <div className="stat-card">
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {helpText && <div className="stat-help">{helpText}</div>}
      </div>
    </div>
  );
};

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

// Simple Log Viewer Component
const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getLogs(20); // Get the last 20 log entries
      setLogs(response.data);
    } catch (err) {
      setError('Failed to fetch logs: ' + (err.message || 'Unknown error'));
      console.error('Error fetching logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // Set up interval to refresh logs
    const intervalId = setInterval(fetchLogs, 30000); // Refresh every 30 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Parse log level to determine color
  const getLogLevelClass = (logLine) => {
    if (logLine.includes('[DEBUG]')) return { color: 'var(--primary)' };
    if (logLine.includes('[INFO]')) return { color: 'var(--success)' };
    if (logLine.includes('[WARNING]')) return { color: 'var(--primary)' };
    if (logLine.includes('[ERROR]')) return { color: 'var(--error)' };
    if (logLine.includes('[CRITICAL]')) return { color: 'var(--error)' };
    return {};
  };

  return (
    <div className="card" id="logs">
      <div className="card-header">
        <div>
          <h2 className="card-title">System Logs</h2>
          <div className="card-subtitle">Recent activity from the backend server</div>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={fetchLogs}
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <div className="card-body">
        {isLoading && logs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p>Loading logs...</p>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            {error}
          </div>
        ) : logs.length === 0 ? (
          <p>No logs available</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {logs.map((log, index) => (
              <div
                key={index}
                className="code"
                style={{
                  ...getLogLevelClass(log),
                  fontSize: '0.8rem'
                }}
              >
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function SimpleDashboard({ theme }) {
  const [result, setResult] = useState(null);

  return (
    <div className="section">
      {/* Hero Section */}
      <div 
        style={{ 
          padding: '2rem', 
          borderRadius: '0.5rem', 
          background: 'var(--secondary)', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Matched Betting Dashboard</h1>
        <p>Advanced analytics and predictions for value betting opportunities</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
        <StatCard
          label="Accuracy"
          value="87%"
          helpText="Last 30 days"
          icon="📊"
        />
        
        <StatCard
          label="Predictions"
          value="142"
          helpText="Total analyzed"
          icon="📈"
        />
        
        <StatCard
          label="Avg. Value"
          value="+4.2%"
          helpText="Expected value"
          icon="💰"
        />
      </div>

      {/* Calculator */}
      <Calculator onResultUpdate={setResult} />
      
      {/* Results */}
      <ResultsDisplay result={result} />
      
      {/* Logs */}
      <LogViewer />
    </div>
  );
}