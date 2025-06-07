# Matched Betting Framework

Il nostro Simple Matched Betting Calculator è un framework in versione alpha per eseguire matched betting e value betting tramite bot e strategie.

Si tratta di un MVP basato su:

* Raccolta dati mock da provider (Opta, Bet365, Paddy)
* Moduli di log colorato e persistente
* Business logic: predizione esito e identificazione value bet
* Generazione di report PDF completo di log, tabelle e grafici

---

## 📋 Prerequisiti

* Python 3.8+ installato
* Windows/macOS/Linux
* Una cartella di progetto pulita
* (Consigliato) Virtual environment **venv** o **conda**

---

## ⚙️ Setup Ambiente

1. **Clona o copia** la cartella del progetto:

   ```bash
   git clone <repository-url> value_betting_app
   cd value_betting_app
   ```

2. **Crea e attiva** un virtual environment (venv):

   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Installa** le dipendenze:

   ```bash
   pip install -r requirements.txt
   ```

---

## 🗂️ Struttura del Progetto

```text
value_betting_app/
├── engine/                # Layer di fetch e logica di business
│   ├── __init__.py
│   ├── data.py           # fetch_opta_data, fetch_betting_odds, unify_data
│   ├── prediction.py     # predict_match
│   ├── value_bet.py      # identify_value_bet
├── custom_logger.py       # logger colorato con StreamHandler e FileHandler
├── logic.py               # EV, implied_probability, is_value, simulate
├── main.py                # entrypoint: unisce flussi e genera report PDF
├── requirements.txt       # dipendenze pip
└── README.md              # questo file
```

---

## 🚀 Esecuzione

1. **Avvia** l'applicazione:

   ```bash
   python main.py
   ```
2. **Inserisci** il tuo nome quando richiesto.
3. L'app genererà in sequenza:

   * Dati mock da Opta + provider
   * Log colorato in console e file in `logs/`
   * Report PDF `Report_<Nome>_<YYYYMMDD>.pdf` con:

     * Copertina (utente, periodo)
     * Tabella ultime log
     * Tabella quote providers
     * Grafico quote (Matplotlib)
     * Sezione risultati predict e value bet

---

## 🧪 Testing (TDD Inline)

Nel `main.py` è presente la funzione di test inline:

```python
from engine.data import unify_data
# ...
# run_tests() chiamata alla fine
```

Puoi estendere o integrare con pytest/faker per testare:

* `fetch_opta_data`
* `fetch_betting_odds`
* `unify_data`
* `predict_match`
* `identify_value_bet`
* Creazione del PDF

---

## 🎯 Prossimi Step

* Integrare API reali (Opta, Bet365)
* Sostituire i mock in `engine/data.py`
* Aggiungere web API (FastAPI/Flask) per endpoint `/predict_match` e `/identify_value_bet`
* Dashboard interattiva con Streamlit o React
* Persistenza su database (SQLite/PostgreSQL) dei risultati e delle quote

---

## 🤝 Contribuire

1. Fork del repository
2. Crea un branch feature: `git checkout -b feature/nome-feature`
3. Commit delle modifiche: \`git commit -m "Aggiunge feature X"
4. Push: `git push origin feature/nome-feature`
5. Apri una Pull Request

---

## 📄 Licenza

[MIT License](LICENSE)

---

*Buon lavoro e buon testing!*

