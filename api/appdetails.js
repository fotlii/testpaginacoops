const axios = require('axios');

const handler = async (req, res) => {
    try {
        const { appids, appId } = req.query; // Acepta 'appId' para un solo juego
        const finalAppIds = appids || appId;

        if (!finalAppIds) {
            return res.status(400).json({ error: 'Bad Request', message: 'Falta el parámetro appids o appId' });
        }

        const steamApiUrl = `https://store.steampowered.com/api/appdetails?appids=${finalAppIds}&cc=es&l=spanish`;
        console.log(`[Backend] Obteniendo detalles de: ${steamApiUrl}`);

        const response = await axios.get(steamApiUrl);
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('[Backend] Error obteniendo detalles de Steam:', error.message);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

module.exports = handler;
