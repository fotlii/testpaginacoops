const express = require('express');
const searchGamesHandler = require('./api/searchgames.js');
const appDetailsHandler = require('./api/appdetails.js');

const app = express();
const PORT = 3001;

app.use(express.json());

// Simula el enrutamiento de Vercel para el desarrollo local
app.get('/api/searchgames', searchGamesHandler);
app.get('/api/appdetails', appDetailsHandler);

app.listen(PORT, () => {
  console.log(`[Server] Servidor de desarrollo corriendo en http://localhost:${PORT}`);
});
