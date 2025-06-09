import pandas as pd
import numpy as np

def helper(match_id: str, providers: list) -> pd.DataFrame:
    """
    Mock: genera DataFrame con odds casuali per ciascun provider.
    """
    recs = []
    for p in providers:
        recs.append({
            "provider": p,
            "odds_home": round(2 + np.random.rand()*0.5, 2),
            "odds_draw": round(3 + np.random.rand()*0.5, 2),
            "odds_away": round(3 + np.random.rand()*0.5, 2),
        })
    return pd.DataFrame(recs)

def identify_value_bet(match_id: str, providers: list, our_probs: dict, logger=None):
    """
    Identifica il value bet migliore confrontando le nostre probabilità
    con quelle implicite delle quote.
    """
    if logger:
        logger.info(f"[identify_value_bet] Cercando value bet per {match_id}")
    
    # Mock: restituisce un messaggio di value bet
    return f"Value Bet trovato: HOME @ 2.0 (valore +5.2%)"