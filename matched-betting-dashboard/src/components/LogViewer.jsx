import React, { useState, useEffect } from 'react';
import { getLogs } from '../services/api';

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

export default LogViewer;