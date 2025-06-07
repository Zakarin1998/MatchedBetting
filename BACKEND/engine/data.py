import pandas as pd

# --- MOCK FETCH FUNCTIONS ---

def fetch_opta_data(match_id: str) -> pd.DataFrame:
    """
    Mock dei dati statistici Opta.
    """
    # Esempio minimale: potresti aggiungere colonne su forma, gol medi, ecc.
    return pd.DataFrame({
        "match_id": [match_id],
        "opta_home_goals": [1.4],
        "opta_away_goals": [1.1],
        "opta_draw_prob": [0.28]
    })

def fetch_betting_odds(match_id: str, provider: str) -> pd.DataFrame:
    """
    Mock download quote dal provider.
    """
    print(f"[LOG] Scaricamento dati {provider} in corso...")
    # Quote leggermente diverse a seconda del provider
    home = 2.0 if provider == "Bet365" else 1.9
    draw = 3.5 if provider == "Bet365" else 3.4
    away = 3.0 if provider == "Bet365" else 3.1

    return pd.DataFrame({
        "match_id": [match_id],
        "provider": [provider],
        "odds_home": [home],
        "odds_draw": [draw],
        "odds_away": [away]
    })

def unify_data(match_id: str, providers: list) -> pd.DataFrame:
    """
    Unisce i dati Opta con quelli dei provider di quote.
    """
    # 1) Prendi dati Opta
    df_opta = fetch_opta_data(match_id)

    # 2) Scarica le quote da ogni provider
    df_list = [fetch_betting_odds(match_id, p) for p in providers]
    df_odds = pd.concat(df_list, ignore_index=True)

    # 3) Merge finale su match_id
    df = pd.merge(df_opta, df_odds, on="match_id")
    return df
