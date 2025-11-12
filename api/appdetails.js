const axios = require('axios');

const STEAM_API_BASE_URL = 'https://store.steampowered.com/api';

module.exports = async (req, res) => {
  try {
    const { appids, l = 'english' } = req.query;
    
    console.log('Received request with appids:', appids);
    
    if (!appids) {
      return res.status(400).json({ error: 'Missing appids parameter' });
    }

    // Probar con un solo appid primero
    const testAppIds = appids.split(',')[0]; // Tomar solo el primero para probar
    const testUrl = `${STEAM_API_BASE_URL}/appdetails?appids=${testAppIds}&l=${l}`;
    
    console.log('Testing with single app ID URL:', testUrl);

    const response = await axios.get(testUrl);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response.data);
    
  } catch (error) {
    console.error('Full error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ 
      error: 'Request failed',
      details: error.message,
      testedAppId: req.query.appids?.split(',')[0]
    });
  }
};