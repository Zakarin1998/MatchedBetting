import React, { useState } from 'react'
import { predictMatch, identifyValueBet } from '../services/api'

export default function Calculator({ onResult }) {
  const [matchId, setMatchId] = useState('Milan-Inter')
  const [providers, setProviders] = useState('Bet365,Betfair')

  const handleRun = async () => {
    const provArr = providers.split(',').map(p => p.trim())
    const pred = await predictMatch(matchId, provArr)
    const vb = await identifyValueBet(matchId, provArr, { home: 0.55 })
    onResult({ pred: pred.data, vb: vb.data })
  }

  return (
    <div className="calculator">
      <div>
        <label>Match ID:</label>
        <input value={matchId} onChange={e => setMatchId(e.target.value)} />
      </div>
      <div>
        <label>Providers (comma):</label>
        <input value={providers} onChange={e => setProviders(e.target.value)} />
      </div>
      <button onClick={handleRun}>Run Prediction</button>
    </div>
  )
}