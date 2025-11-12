const axios = require('axios');

const STEAM_API_BASE_URL = 'https://store.steampowered.com/api';

// This function is designed to run on Vercel as a Serverless Function.
module.exports = async (req, res) => {
  try {
    // Use URLSearchParams to safely construct the query string from the incoming request's query object.
    const params = new URLSearchParams(req.query).toString();
    const steamApiUrl = `${STEAM_API_BASE_URL}/appdetails?${params}`;

    console.log(`[Vercel Function] Forwarding request to: ${steamApiUrl}`);

    const response = await axios.get(steamApiUrl);
    
    // Set CORS headers to allow requests from any origin, which is good practice for a public API proxy.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Forward the successful response from Steam back to the client.
    res.status(200).json(response.data);
  } catch (error) {
    console.error('[Vercel Function] Error fetching from Steam API:', error.message);
    if (error.response) {
      // If Steam returned an error, forward that status and data.
      res.status(error.response.status).send(error.response.data);
    } else {
      // For network or other unexpected errors, return a generic 500.
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }
};