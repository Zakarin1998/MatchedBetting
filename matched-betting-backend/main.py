# main.py
import os
import logging
from datetime import datetime, timedelta
import matplotlib.pyplot as plt

from custom_logger import setup_logger
from engine.prediction import predict_match
from engine.value_bet import identify_value_bet
from engine.data import unify_data

from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

# --- CONFIG & LOGGER ---
LOG_NAME = "value_betting_app"
logger = setup_logger(LOG_NAME, level=logging.DEBUG)
LOG_DIR = "logs"
NUM_LOG_LINES = 10  # quante righe di log includere nel report
GRAPH_FILE = "odds_plot.png"

# --- STYLES PDF ---
def setup_styles():
    styles = getSampleStyleSheet()
    title = ParagraphStyle('Title', parent=styles['Title'], fontSize=20,
                           textColor=colors.HexColor('#2b7a78'), alignment=1, spaceAfter=12)
    heading = ParagraphStyle('Heading', parent=styles['Heading2'], fontSize=14,
                             textColor=colors.HexColor('#3aafa9'), spaceAfter=8)
    normal = ParagraphStyle('Normal', parent=styles['Normal'], fontSize=10,
                            textColor=colors.HexColor('#17252a'), leading=12)
    return title, heading, normal

# --- HELPERS ---
def get_latest_log_file():
    files = [os.path.join(LOG_DIR, f) for f in os.listdir(LOG_DIR)]
    files = [f for f in files if os.path.isfile(f)]
    latest = max(files, key=os.path.getmtime)
    return latest

def tail(filepath, n=10):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read().splitlines()[-n:]

def plot_mock_odds(df):
    # genera grafico quote medie per provider
    providers = df['provider']
    home = df['odds_home']
    draw = df['odds_draw']
    away = df['odds_away']
    plt.figure()
    plt.plot(providers, home, marker='o', label='Home')
    plt.plot(providers, draw, marker='o', label='Draw')
    plt.plot(providers, away, marker='o', label='Away')
    plt.title("Quote per provider")
    plt.legend()
    plt.tight_layout()
    plt.savefig(GRAPH_FILE)
    plt.close()

# --- PDF REPORT ---
def create_report_pdf(user: str, start: datetime, end: datetime,
                      outcome: str, scores: list, vb_msg: str, df: 'pd.DataFrame'):
    """Genera un PDF di report con log, tabelle e grafico."""
    filename = f"Report_{user}_{start:%Y%m%d}.pdf"
    logger.info(f"[create_report_pdf] Start: {filename}")
    doc = SimpleDocTemplate(filename, pagesize=A4, rightMargin=20, leftMargin=20)
    elems = []
    title_st, head_st, norm_st = setup_styles()

    # Copertina
    elems.append(Paragraph("Matched Betting Report", title_st))
    elems.append(Paragraph(f"Utente: {user}", norm_st))
    elems.append(Paragraph(f"Periodo: {start.date()} – {end.date()}", norm_st))
    elems.append(Spacer(1, 12))

    # Sezione Log
    elems.append(Paragraph("📋 Ultime log", head_st))
    log_file = get_latest_log_file()
    lines = tail(log_file, NUM_LOG_LINES)
    log_data = [["Timestamp", "Livello", "Messaggio"]]
    for line in lines:
        # es. "[INFO] 2025-06-08 12:00:00 name - msg"
        parts = line.split(" ", 3)
        if len(parts) == 4:
            lvl = parts[0].strip("[]")
            ts = parts[1] + " " + parts[2]
            msg = parts[3]
        else:
            lvl, ts, msg = "", "", line
        log_data.append([ts, lvl, msg])
    tbl_log = Table(log_data, colWidths=[100, 50, 350])
    tbl_log.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#def2f1")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#3aafa9")),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    elems.append(tbl_log)
    elems.append(Spacer(1, 12))

    # Sezione Quote Providers
    elems.append(Paragraph("Quote Provider", head_st))
    data = [["Provider", "Home", "Draw", "Away"]]
    for _, row in df.iterrows():
        data.append([
            row['provider'],
            f"{row['odds_home']:.2f}",
            f"{row['odds_draw']:.2f}",
            f"{row['odds_away']:.2f}"
        ])
    tbl_odds = Table(data, colWidths=[100, 70, 70, 70])
    tbl_odds.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#2b7a78")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#3aafa9")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    elems.append(tbl_odds)
    elems.append(Spacer(1, 12))

    # Grafico
    plot_mock_odds(df)
    elems.append(Paragraph("Grafico quote", head_st))
    elems.append(Image(GRAPH_FILE, width=400, height=200))
    elems.append(Spacer(1, 12))

    # Risultati Betting
    elems.append(Paragraph("Risultati Betting", head_st))
    elems.append(Paragraph(f"Predict Match: outcome={outcome}, scores={scores}", norm_st))
    elems.append(Paragraph(f"Value Bet: {vb_msg}", norm_st))

    # Build
    doc.build(elems)
    logger.info(f"[create_report_pdf] Saved: {filename}")

# --- MAIN FLOW ---
if __name__ == "__main__":
    user = input("Nome utente: ").strip() or "TestUser"
    start = datetime.now()
    end = start + timedelta(weeks=5)

    logger.info("=== Avvio applicazione alpha_version ===")

    # 1) Unify data & predict
    providers = ["Bet365", "Paddy"]
    logger.info("[main] Unifying data for predict_match")
    outcome, scores = predict_match("Milan-Inter", providers, logger)

    # 2) Identify value bet
    logger.info("[main] Identifying value bet")
    vb_msg = identify_value_bet("Milan-Inter", providers, {"home": 0.55}, logger)

    # 3) Re-fetch data for report
    df = unify_data("Milan-Inter", providers)

    # 4) Create PDF report
    create_report_pdf(user, start, end, outcome, scores, vb_msg, df)

    logger.info("=== Fine esecuzione ===")
