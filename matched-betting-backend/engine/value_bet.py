import pandas as pd
import numpy as np
from engine.data import unify_data
from engine.logic import is_value

def identify_value_bet(match_id: str, providers: list, our_probs: dict, logger=None):
    """
    Identifica il value bet migliore confrontando le nostre probabilità
    con quelle implicite delle quote.
    """
    if logger:
        logger.info(f"[identify_value_bet] Cercando value bet per {match_id}")
    
    # Mock: restituisce un messaggio di value bet
    return f"Value Bet trovato: HOME @ 2.0 (valore +5.2%)"


def identify_value_bet_v2(match_id: str, providers: list, our_probs: dict, logger):
    """
    Flusso di individuazione value bet:
      - calcola odds medie
      - confronta con la nostra probabilità
    """
    logger.info(f"[identify_value_bet] Inizio flusso per '{match_id}'")
    df = unify_data(match_id, providers)
    avg_odds = df["odds_home"].mean()
    logger.debug(f"Odds_home media: {avg_odds:.2f}, nostra prob: {our_probs['home']:.2f}")
    if is_value(our_probs["home"], avg_odds):
        msg = f"Value bet: Home con odds medie {avg_odds:.2f}"
        logger.info(msg)
    else:
        msg = "Nessuna value bet trovata"
        logger.warning(msg)
    return msg
