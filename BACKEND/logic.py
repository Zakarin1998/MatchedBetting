# logic.py
# Funzioni base per EV, probabilità, valore e simulazione

def implied_probability(odds: float) -> float:
    """1/odds"""
    return 1 / odds

def expected_value(prob: float, odds: float, stake: float = 1.0) -> float:
    """
    EV = prob * (odds * stake) - (1 - prob) * stake
    """
    return prob * (odds * stake) - (1 - prob) * stake

def is_value(prob: float, odds: float, threshold: float = 0.0) -> bool:
    """
    Restituisce True se EV > threshold
    """
    return expected_value(prob, odds) > threshold

def simulate(match_id: str, providers: list, n: int = 1000) -> dict:
    """
    Simulazione Monte Carlo mock.
    """
    # Restituisce distribuzione fittizia
    return {"HomeWin": 0.5, "Draw": 0.3, "AwayWin": 0.2}
