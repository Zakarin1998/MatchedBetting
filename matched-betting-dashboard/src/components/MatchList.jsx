import React from 'react'

export default function MatchList({ result }) {
  if (!result) return null
  
  const { pred, vb } = result
  
  return (
    <div className="match-list">
      <h2>Results</h2>
      <p><strong>Prediction:</strong> {pred[0]} – Scores: {pred[1].join(', ')}</p>
      <p><strong>Value Bet:</strong> {vb}</p>
    </div>
  )
}