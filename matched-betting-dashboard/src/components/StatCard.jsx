import React from 'react';

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

export default StatCard;