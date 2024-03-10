import express from 'express';
import axios from 'axios';
import { writeFile } from 'fs/promises';

const app = express();
const PORT = 3000;

// Definisci un endpoint che effettua la chiamata HTTP al servizio esterno e salva la risposta in un file JSON
app.get('/fetch-and-save', async (req, res) => {
    try {
        // Effettua la chiamata HTTP al servizio esterno
        const response = await axios.get('https://www.eurobet.it/detail-service/sport-schedule/services/meeting/calcio/it-serie-a?prematch=1&live=0');

        // Salva la risposta in un nuovo file JSON
        await writeFile('response.json', JSON.stringify(response.data, null, 2));

        res.status(200).send('Dati salvati con successo!');
    } catch (error) {
        console.error('Errore durante la richiesta o il salvataggio:', error);
        res.status(500).send('Errore interno del server');
    }
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
