import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import LogViewer from './LogViewer';
import Calculator from './Calculator';
import ResultsDisplay from './ResultsDisplay';


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