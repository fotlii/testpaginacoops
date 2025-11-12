const express = require('express');
const { handler } = require('./api/searchgames.js');

const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Endpoint que simula el comportamiento de la Vercel Function
app.all('/api/searchgames', async (req, res) => {
  try {
    // La función 'handler' de Vercel espera un formato de request específico
    await handler(req, res);
  } catch (error) {
    console.error('Error in local dev server:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`[server] Development server running at http://localhost:${port}`);
});
