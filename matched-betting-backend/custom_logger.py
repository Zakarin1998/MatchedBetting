import logging
import os
from datetime import datetime

try:
    import colorlog
except ImportError:
    raise ImportError("Installa 'colorlog' per il logging colorato: pip install colorlog")

def setup_logger(name: str = "betting_app", level: int = logging.DEBUG) -> logging.Logger:
    """
    Configura un logger colorato:
    - StreamHandler con colori per la console
    - FileHandler in logs/
    """
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    if not logger.handlers:
        # Colori per i livelli
        log_colors = {
            "DEBUG": "cyan",
            "INFO": "green",
            "WARNING": "yellow",
            "ERROR": "red",
            "CRITICAL": "bold_red",
        }

        fmt = "%(log_color)s[%(levelname)s] %(asctime)s %(name)s - %(message)s"
        datefmt = "%Y-%m-%d %H:%M:%S"
        # Console handler (colorato)
        ch = colorlog.StreamHandler()
        ch.setLevel(level)
        ch.setFormatter(colorlog.ColoredFormatter(fmt, datefmt=datefmt, log_colors=log_colors))
        logger.addHandler(ch)
    
        # File handler (semplice)
        os.makedirs("logs", exist_ok=True)
        logfile = os.path.join("logs", f"{name}_{datetime.now():%Y%m%d_%H%M%S}.log")
        fh = logging.FileHandler(logfile)
        fh.setLevel(level)
        fh.setFormatter(logging.Formatter("[%(levelname)s] %(asctime)s %(name)s - %(message)s", datefmt=datefmt))
        logger.addHandler(fh)
    
    return logger
