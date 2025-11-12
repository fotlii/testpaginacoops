const axios = require('axios');

const STEAM_API_BASE_URL = 'https://store.steampowered.com/api';

module.exports = async (req, res) => {
  try {
    // Extract the appids parameter directly from req.query
    const { appids, ...otherParams } = req.query;
    
    if (!appids) {
      return res.status(400).json({ error: 'Missing appids parameter' });
    }

    // Construct the Steam API URL properly
    const steamParams = new URLSearchParams();
    steamParams.append('appids', appids);
    
    // Add any other parameters (like l for language)
    Object.keys(otherParams).forEach(key => {
      steamParams.append(key, otherParams[key]);
    });

    const steamApiUrl = `${STEAM_API_BASE_URL}/appdetails?${steamParams.toString()}`;

    console.log(`[Vercel Function] Forwarding request to: ${steamApiUrl}`);

    const response = await axios.get(steamApiUrl);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Send the Steam response back
    res.status(200).json(response.data);
  } catch (error) {
    console.error('[Vercel Function] Error fetching from Steam API:', error.message);
    
    // Set CORS headers for error responses too
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    if (error.response) {
      res.status(error.response.status).json({ 
        error: 'Steam API Error', 
        message: error.message,
        steamStatus: error.response.status,
        steamData: error.response.data 
      });
    } else {
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error.message 
      });
    }
  }
};