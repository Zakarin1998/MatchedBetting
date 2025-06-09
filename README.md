# Matched Betting Dashboard - Documentazione Completa

Il progetto Matched Betting Calculator è un framework in versione alpha per eseguire matched betting e value betting tramite bot e strategie.

---

A React and Python based fullstack application, with frontend dashboard interacting with a python backend implementing solutions for matched betting predictions and value bet identification.

---

Si tratta di un MVP basato su:

* Raccolta dati mock da provider (Opta, Bet365, Paddy)
* Moduli di log colorato e persistente
* Business logic: predizione esito e identificazione value bet
* Generazione di report PDF completo di log, tabelle e grafici

---

## Features

- Match prediction calculation
- Value bet identification
- Integration with betting APIs

### Avvio Congiunto

Per comodità, è possibile utilizzare gli script:
- `run_app.bat` (Windows)
- `run_app.sh` (Linux/Mac)

### 🧪 Testing e generazione PDF (TDD Inline)

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

## Panoramica

Il Matched Betting Dashboard è un'applicazione web moderna che fornisce strumenti per l'analisi e la previsione delle scommesse sportive. Il progetto è composto da due componenti principali:

1. **Frontend**: Un'applicazione React con UI moderna e responsiva
2. **Backend**: Un server API Flask che fornisce dati e calcoli per le previsioni

Il sistema attuale è basato su dati simulati (mock data), ma è progettato per essere facilmente esteso con integrazioni reali a provider di quote e fonti di dati sportivi.

## Frontend (React) - `matched-betting-dashboard/`

### Struttura del progetto

La struttura del progetto React è organizzata come segue:

```
matched-betting-dashboard/
├─ public/
│  └─ favicon.png
├─ src/
│  ├─ test/
│  │  └─ setup.js
│  ├─ services/
│  │  └─ api.js
│  ├─ components/
│  │  ├─ Calculator.jsx
│  │  ├─ Header.jsx
│  │  ├─ LogViewer.jsx
│  │  ├─ MatchList.jsx
│  │  ├─ ResultsDisplay.jsx
│  │  ├─ SimpleDashboard.jsx
│  │  ├─ SimpleLayout.jsx
│  │  └─ StatCard.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ vite.config.js
├─ package.json
├─ eslint.config.js
└─ README.md
```

### Installazione, Setup, Configurazione e Avvio

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`


```bash
# Installa dipendenze
cd matched-betting-dashboard
npm install

# Avvia in modalità sviluppo
npm run dev

# Build per produzione
npm run build
```


### Tecnologie Principali

- **React 18**: Libreria UI
- **Vite**: Build tool e dev server
- **CSS Personalizzato**: Sistema di stile con supporto tema chiaro/scuro
- **Axios**: Client HTTP per le chiamate API

### Componenti Principali

#### Layout e Struttura

- **SimpleLayout** (`src/components/SimpleLayout.jsx`): Fornisce la struttura della pagina con navbar, footer e gestore del tema
- **SimpleDashboard** (`src/components/SimpleDashboard.jsx`): Componente principale della dashboard che contiene tutti gli elementi

#### Componenti Funzionali

- **Calculator**: Form per inserire i dati del match e calcolare le previsioni
- **ResultsDisplay**: Visualizza i risultati delle previsioni e i value bet
- **LogViewer**: Mostra i log di sistema dal backend
- **StatCard**: Card statistiche per visualizzare metriche chiave

### Stili e UI

- **index.css**: Contiene tutti gli stili CSS dell'applicazione
  - Sistema di variabili CSS per il tema chiaro/scuro
  - Layout responsive con grid e flexbox
  - Componenti stilizzati come card, bottoni, form, ecc.

### Gestione del Tema

Il tema (chiaro/scuro) viene gestito tramite:
1. Stato React (`theme`) in App.jsx
2. Salvataggio della preferenza in localStorage
3. Classe CSS aggiunta all'elemento HTML (`html.dark` o `html.light`)
4. Variabili CSS che cambiano in base alla classe

### Servizi API

- **api.js** (`src/services/api.js`): Contiene tutte le funzioni per le chiamate al backend
  - `predictMatch`: Richiede previsioni per una partita
  - `identifyValueBet`: Identifica opportunità di value betting
  - `getLogs`: Ottiene i log di sistema
  - `getStats`: Ottiene statistiche chiave


## Backend (Python) - `matched-betting-backend/`

### Struttura del progetto

La struttura del progetto Python è organizzata come segue:

```
matched-betting-dashboard/       # Backend Flask
├─ logs/                         # Log dell'applicazione
│  └─ logXYZ.txt
├─ engine/                       # Layer di fetch, logica di business, moduli di calcolo
│  ├─ __init__.py
│  ├─ data.py                    # Gestione dati e provider, fetch_opta_data, fetch_betting_odds, unify_data
│  ├─ logic.py                   # Formule e algoritmi di calcolo
│  ├─ prediction.py              # Logica di previsione
│  └─ value_bet.py               # Identificazione value bet
├─ app.py                        # Server Flask API
├─ config.py
├─ custom_logger.py              # Logger personalizzato
├─ main.py                       # entrypoint: unisce flussi e genera report PDF
├─ README.md                     # Documentazione backend
└─ requirements.txt              # Dipendenze backend      
```

### 📋 Prerequisiti

* Python 3.8+ installato
* Windows/macOS/Linux
* Una cartella di progetto pulita
* (Consigliato) Virtual environment **venv** o **conda**

---

### ⚙️ Setup Ambiente Backend

```bash
# Crea ambiente virtuale (consigliato)
cd matched-betting-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Installa dipendenze
pip install -r requirements.txt

# Avvia il server
python app.py
```

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

### 🚀 Esecuzione

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

### Tecnologie Principali

- **Flask**: Server web e API
- **Pandas**: Manipolazione dati
- **ColorLog**: Logging colorato
- **ReportLab**: Generazione report PDF

### Moduli Principali

- **app.py**: Server Flask con endpoint API
  - `/api/predict_match`: Calcola previsioni match
  - `/api/identify_value_bet`: Identifica value bet
  - `/api/odds_data`: Ottiene dati quote dai provider
  - `/api/logs`: Accesso ai log di sistema

- **engine/**: Moduli di calcolo e logica
  - **data.py**: Funzioni per raccolta e unificazione dati
  - **prediction.py**: Algoritmi di previsione
  - **value_bet.py**: Identificazione value bet
  - **logic.py**: Formule matematiche e algoritmi base

- **custom_logger.py**: Sistema di logging personalizzato con output colorato su console e file

### Funzionalità Backend

- Integrazione con provider di quote (attualmente simulata)
- Calcolo di probabilità e value betting
- Generazione di report dettagliati con grafici
- Logging completo di tutte le operazioni

## Flusso di Lavoro dell'Applicazione

1. **Avvio**:
   - L'utente accede alla dashboard tramite browser
   - Il frontend si connette all'API backend

2. **Previsione Match**:
   - L'utente inserisce ID del match e provider nel form
   - Il frontend invia una richiesta all'endpoint `/api/predict_match`
   - Il backend calcola la previsione utilizzando i moduli in `engine/`
   - Il risultato viene visualizzato nel componente ResultsDisplay

3. **Identificazione Value Bet**:
   - Contemporaneamente alla previsione, il sistema calcola il value bet
   - Utilizza l'endpoint `/api/identify_value_bet`
   - Il calcolo confronta le probabilità dell'utente con quelle implicite nelle quote

4. **Visualizzazione Log**:
   - Il componente LogViewer richiede periodicamente i log dal backend
   - I log vengono visualizzati con formattazione e colori appropriati

5. **Gestione Errori**:
   - Gli errori vengono catturati e visualizzati nei componenti appropriati
   - Il backend restituisce messaggi di errore chiari per facilitare il debug

## Note Sull'Architettura

## Note sulla Sicurezza

- L'applicazione attuale è pensata per l'ambiente di sviluppo
- In produzione, aggiungere autenticazione e autorizzazione
- Implementare rate limiting sulle API
- Configurare HTTPS per tutte le comunicazioni

## Conclusione

Il Matched Betting Dashboard è una base solida per un sistema di analisi e previsione scommesse. La separazione tra frontend e backend permette uno sviluppo indipendente e scalabile. L'eliminazione della dipendenza da Chakra UI ha reso l'applicazione più stabile e manutenibile.

Il sistema attuale utilizza dati simulati ma è progettato per essere facilmente esteso con integrazioni reali. La struttura modulare del backend permette di aggiungere nuovi algoritmi e fonti di dati senza modificare l'architettura di base.

Per estensioni future, è consigliabile sviluppare un "CMS" interno che faciliti la gestione dei dati e fornisca un'interfaccia amministrativa per controllare il sistema.


## 🎯 Estensioni Future e Prossimi Tasks

Comprende varie attività, tra cui

* Integrare API reali (Opta, Bet365)
* Sostituire i mock in `engine/data.py`
* Aggiungere web API (FastAPI/Flask) per endpoint `/predict_match` e `/identify_value_bet`
* Dashboard interattiva con Streamlit o React
* Persistenza su database (SQLite/PostgreSQL) dei risultati e delle quote

### 1. Integrazione con Provider Reali

Modificare il modulo `engine/data.py` per integrare API reali:
- Bookmaker (Bet365, Betfair, ecc.)
- Provider di statistiche sportive (Opta, Stats Perform)

### 2. Sistema CMS Interno

Sviluppare un sistema di gestione contenuti per:
- Gestione utenti e ruoli
- Salvare e caricare previsioni
- Creare e gestire strategie di betting

### 3. Miglioramenti UI/UX

- Aggiungere visualizzazioni dati più avanzate (grafici interattivi)
- Implementare dashboard personalizzabili
- Aggiungere notifiche in tempo reale per opportunità di value betting

### 4. Funzionalità Avanzate

- Modelli ML per previsioni più accurate
- Integrazione con portafogli elettronici per tracciare le scommesse
- Analisi ROI e metriche di performance

1. **Rifattorizzare `src/App.jsx` e altri file**:
   - Rimuovere qualsiasi import non necessario
   - Verificare che tutti i riferimenti ai componenti eliminati siano stati aggiornati

2. **Aggiornare `package.json`**:
   - Rimuovere dipendenze non utilizzate (es. Chakra UI, se ancora presente)

Questa struttura è più pulita, mantiene solo i componenti attivamente utilizzati.
Questo rende il progetto più leggibile e manutenibile.

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
