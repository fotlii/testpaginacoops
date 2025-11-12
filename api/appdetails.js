const axios = require('axios');

const STEAM_API_BASE_URL = 'https://store.steampowered.com/api';

module.exports = async (req, res) => {
  try {
    // Extraer parámetros directamente
    const { appids, l = 'english' } = req.query;
    
    if (!appids) {
      return res.status(400).json({ error: 'Missing appids parameter' });
    }

    // Construir la URL manualmente SIN codificar las comas
    const steamApiUrl = `${STEAM_API_BASE_URL}/appdetails?appids=${appids}&l=${l}`;

    console.log(`[Vercel Function] Forwarding request to: ${steamApiUrl}`);

    const response = await axios.get(steamApiUrl);
    
    // Configurar cabeceras CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Enviar respuesta de Steam
    res.status(200).json(response.data);
  } catch (error) {
    console.error('[Vercel Function] Error fetching from Steam API:', error.message);
    
    // Cabeceras CORS para respuestas de error también
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    if (error.response) {
      res.status(error.response.status).json({ 
        error: 'Steam API Error',
        message: error.message,
        details: 'The Steam API returned an error. This might be due to invalid app IDs or API restrictions.'
      });
    } else {
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error.message 
      });
    }
  }
};