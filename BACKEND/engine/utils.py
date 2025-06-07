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
