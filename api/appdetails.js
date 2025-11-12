const axios = require('axios');

const STEAM_API_BASE_URL = 'https://store.steampowered.com/api';

module.exports = async (req, res) => {
  try {
    // Correctly reconstruct the query string from the incoming request object
    const params = new URLSearchParams(req.query).toString();
    const steamApiUrl = `${STEAM_API_BASE_URL}/appdetails?${params}`;

    console.log(`[Vercel Function] Forwarding request to: ${steamApiUrl}`);

    const response = await axios.get(steamApiUrl);
    
    // Set CORS headers for broader compatibility
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Send the successful response from Steam back to the client
    res.status(200).json(response.data);

  } catch (error) {
    console.error('[Vercel Function] Error fetching from Steam API:', {
      message: error.message,
      status: error.response?.status,
    });
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // Forward the error status and data from Steam if available
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ 
        error: 'Internal Server Error',
        details: error.message,
      });
    }
  }
};
