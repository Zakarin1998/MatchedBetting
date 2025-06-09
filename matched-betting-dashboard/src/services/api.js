import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export function predictMatch(matchId, providers) {
  return api.post('/predict_match', { match_id: matchId, providers })
}

export function identifyValueBet(matchId, providers, our_probs) {
  return api.post('/identify_value_bet', { match_id: matchId, providers, our_probs })
}

export function getOddsData(matchId, providers) {
  const providersStr = providers.join(',')
  return api.get(`/odds_data?match_id=${matchId}&providers=${providersStr}`)
}

export function getLogs(lines = 10) {
  return api.get(`/logs?lines=${lines}`)
}
