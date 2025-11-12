const axios = require('axios');

const STEAM_API_BASE_URL = 'https://store.steampowered.com/api';

// Exportamos una función que Vercel ejecutará por cada petición
module.exports = async (req, res) => {
  try {
    // Usamos req.query, que es un objeto parseado, y lo reconstruimos.
    // Es más robusto que parsear req.url manualmente.
    const params = new URLSearchParams(req.query).toString();
    const steamApiUrl = `${STEAM_API_BASE_URL}/appdetails?${params}`;

    console.log(`[Vercel Function] Forwarding request to: ${steamApiUrl}`);

    const response = await axios.get(steamApiUrl);
    
    // Configuramos las cabeceras para permitir CORS si fuera necesario
    // y para indicar que el contenido es JSON
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Enviamos la respuesta de Steam de vuelta
    res.status(200).json(response.data);
  } catch (error) {
    console.error('[Vercel Function] Error fetching from Steam API:', error.message);
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }
};
