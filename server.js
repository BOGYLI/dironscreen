const express = require('express');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const app = express();
const port = 3000;
const mediaDirectory = path.join(__dirname, 'media');
const websiteDirectory = path.join(__dirname, 'website');

// Statische Website-Dateien ausliefern
app.use(express.static(websiteDirectory));

// Middleware für JSON-Parsing
app.use(express.json());

// Medienverzeichnis beobachten und Dateiliste automatisch aktualisieren
let mediaFiles = [];

function updateMediaFiles() {
    mediaFiles = fs.readdirSync(mediaDirectory).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.mp4', '.jpg', '.png', '.jpeg'].includes(ext);
    }).map(file => {
        return {
            type: ['.mp4'].includes(path.extname(file).toLowerCase()) ? 'video' : 'image',
            name: file,
            src: `/media/${file}`
        };
    });
}

// Dateien überwachen
chokidar.watch(mediaDirectory).on('all', () => {
    updateMediaFiles();
});

// Statische Medien-Dateien bereitstellen
app.use('/media', express.static(mediaDirectory));

// Endpunkt, um die Liste der Medien abzurufen
app.get('/api/media', (req, res) => {
    res.json(mediaFiles);
});

// Initiale Aktualisierung
updateMediaFiles();

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
