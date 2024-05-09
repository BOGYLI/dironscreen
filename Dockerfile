# Verwenden Sie das Node.js-Image als Basis
FROM node:18

# Verzeichnis im Container erstellen und wechseln
WORKDIR /usr/src/app

# Package.json und package-lock.json kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Kopieren Sie alle Projektdateien ins Arbeitsverzeichnis
COPY . .

# Starten Sie die Node.js-Anwendung
CMD ["node", "server.js"]

# Exponieren Sie den Port 3000, um den Service bereitzustellen
EXPOSE 3000
