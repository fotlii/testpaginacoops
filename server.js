// Simple Express server to act as a proxy for the Steam API
// This is used for local development to get around CORS issues.
const express = require('express');
const axios = require('axios');
const featuredCoopHandler = require('./api/featuredcoop.js');

const app = express();
const port = 3001;

const STEAM_API_BASE_URL = 'https://store.steampowered.com/api';

app.get('/api/appdetails', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query).toString();
    const steamApiUrl = `${STEAM_API_BASE_URL}/appdetails?${params}`;
    
    console.log(`[Proxy Server] Forwarding request to: ${steamApiUrl}`);

    const response = await axios.get(steamApiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('[Proxy Server] Error fetching from Steam API:', error.message);
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

// Add the new route for featured co-op games
app.get('/api/featuredcoop', featuredCoopHandler);

app.listen(port, () => {
  console.log(`[Proxy Server] Running on http://localhost:${port}`);
});