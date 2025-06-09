# Matched Betting Dashboard - Documentazione Completa

A React-based frontend dashboard for matched betting predictions and value bet identification.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Features

- Match prediction calculation
- Value bet identification
- Integration with betting APIs

## Technologies

- React 18
- Vite
- Axios for API requests

## Panoramica

Il Matched Betting Dashboard è un'applicazione web moderna che fornisce strumenti per l'analisi e la previsione delle scommesse sportive. Il progetto è composto da due componenti principali:

1. **Frontend**: Un'applicazione React con UI moderna e responsiva
2. **Backend**: Un server API Flask che fornisce dati e calcoli per le previsioni

Il sistema attuale è basato su dati simulati (mock data), ma è progettato per essere facilmente esteso con integrazioni reali a provider di quote e fonti di dati sportivi.

## Struttura del Progetto

```
matched-betting-project/
├─ matched-betting-dashboard/    # Frontend React
│  ├─ public/                    # File statici
│  ├─ src/                       # Codice sorgente React
│  │  ├─ components/             # Componenti React
│  │  ├─ services/               # Servizi API
│  │  ├─ App.jsx                 # Componente principale
│  │  ├─ main.jsx                # Entry point
│  │  └─ index.css               # Stili globali
│  ├─ package.json               # Dipendenze frontend
│  └─ vite.config.js             # Configurazione Vite
│
└─ matched-betting-backend/      # Backend Flask
   ├─ engine/                    # Moduli di calcolo
   │  ├─ data.py                 # Gestione dati e provider
   │  ├─ prediction.py           # Logica di previsione
   │  ├─ value_bet.py            # Identificazione value bet
   │  └─ logic.py                # Formule e algoritmi
   ├─ logs/                      # Log dell'applicazione
   ├─ app.py                     # Server Flask API
   ├─ custom_logger.py           # Logger personalizzato
   └─ requirements.txt           # Dipendenze backend
```

## Frontend (matched-betting-dashboard)

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

## Backend (matched-betting-backend)

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

## Configurazione e Avvio

### Frontend

```bash
# Installa dipendenze
cd matched-betting-dashboard
npm install

# Avvia in modalità sviluppo
npm run dev

# Build per produzione
npm run build
```

### Backend

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

### Avvio Congiunto

Per comodità, è possibile utilizzare gli script:
- `run_app.bat` (Windows)
- `run_app.sh` (Linux/Mac)

## Estensioni Future

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

## File da Pulire/Rimuovere

Durante lo sviluppo sono stati creati alcuni file temporanei che possono essere rimossi:
- `matched-betting-dashboard/src/components/Layout/` (sostituito da SimpleLayout)
- `matched-betting-dashboard/src/components/Dashboard/` (sostituito da SimpleDashboard)
- `matched-betting-dashboard/src/components/UI/` (componenti non utilizzati)
- `matched-betting-dashboard/src/theme.js` (sostituito da CSS nativo)
- `matched-betting-dashboard/src/test/` (test non più utilizzati)

## Note sulla Sicurezza

- L'applicazione attuale è pensata per l'ambiente di sviluppo
- In produzione, aggiungere autenticazione e autorizzazione
- Implementare rate limiting sulle API
- Configurare HTTPS per tutte le comunicazioni

## Conclusione

Il Matched Betting Dashboard è una base solida per un sistema di analisi e previsione scommesse. La separazione tra frontend e backend permette uno sviluppo indipendente e scalabile. L'eliminazione della dipendenza da Chakra UI ha reso l'applicazione più stabile e manutenibile.

Il sistema attuale utilizza dati simulati ma è progettato per essere facilmente esteso con integrazioni reali. La struttura modulare del backend permette di aggiungere nuovi algoritmi e fonti di dati senza modificare l'architettura di base.

Per estensioni future, è consigliabile sviluppare un "CMS" interno che faciliti la gestione dei dati e fornisca un'interfaccia amministrativa per controllare il sistema.