const axios = require('axios');

const STEAM_API_BASE_URL = 'https://store.steampowered.com/api';

module.exports = async (req, res) => {
  try {
    const { appids, l = 'english' } = req.query;
    
    if (!appids) {
      return res.status(400).json({ error: 'Missing appids parameter' });
    }

    // Construct URL manually to ensure proper format
    const steamApiUrl = `${STEAM_API_BASE_URL}/appdetails?appids=${appids}&l=${l}`;

    console.log(`[Vercel Function] Forwarding request to: ${steamApiUrl}`);

    const response = await axios.get(steamApiUrl);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('[Vercel Function] Error:', error.message);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error.message 
      });
    }
  }
};