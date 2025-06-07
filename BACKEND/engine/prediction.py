from engine.data import unify_data

def predict_match(match_id: str, providers: list, logger):
    """
    Flusso di previsione:
      - unifica dati
      - ritorna outcome + lista score possibili
    """
    logger.info(f"[predict_match] Inizio flusso per '{match_id}'")
    df = unify_data(match_id, providers)
    logger.debug(f"Dati providers: {df.to_dict(orient='records')}")
    # Stub ML
    pred_outcome = "HomeWin"
    scores = ["1-0", "2-1", "1-1"]
    logger.info(f"Outcome predetto: {pred_outcome}")
    logger.debug(f"Scores simulate: {scores}")
    return pred_outcome, scores
