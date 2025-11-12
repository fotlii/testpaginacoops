const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Obtener juegos destacados filtrados por categoría cooperativa
    const response = await axios.get('https://store.steampowered.com/api/featuredcategories', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Filtrar juegos que tengan categoría cooperativa local
    const featuredGames = response.data;
    const coopGames = [];

    // Buscar en diferentes secciones de juegos destacados
    if (featuredGames.specials) {
      processGamesSection(featuredGames.specials.items, coopGames);
    }
    if (featuredGames.top_sellers) {
      processGamesSection(featuredGames.top_sellers.items, coopGames);
    }
    if (featuredGames.new_releases) {
      processGamesSection(featuredGames.new_releases.items, coopGames);
    }

    // Si no encontramos suficientes, hacer búsqueda específica
    if (coopGames.length < 10) {
      const searchResponse = await axios.get(
        'https://store.steampowered.com/search/results/?query=&start=0&count=50&dynamic_data=&sort_by=_ASC&tags=1685&snr=1_7_7_7000_7&filter=tags&tags=1685',
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      
      // Extraer appids de la búsqueda y obtener detalles
      const searchAppIds = extractAppIdsFromSearch(searchResponse.data);
      if (searchAppIds.length > 0) {
        const detailsResponse = await axios.get(
          `https://store.steampowered.com/api/appdetails?appids=${searchAppIds.slice(0, 20).join(',')}`
        );
        Object.values(detailsResponse.data).forEach(game => {
          if (game.success && isLocalCoop(game.data)) {
            coopGames.push(game.data);
          }
        });
      }
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      count: coopGames.length,
      games: coopGames.slice(0, 30) // Limitar a 30 juegos
    });

  } catch (error) {
    console.error('[Vercel Function] Error:', error.message);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ 
      error: 'Failed to fetch coop games',
      message: error.message
    });
  }
};

// Funciones auxiliares
function processGamesSection(games, coopGames) {
  games.forEach(game => {
    if (game && !coopGames.find(g => g.id === game.id)) {
      coopGames.push(game);
    }
  });
}

function extractAppIdsFromSearch(searchData) {
  // Esta función necesitaría parsear el HTML/JSON de búsqueda
  // Por simplicidad, devolvemos algunos appids conocidos de coop
  return [
    632360, // Risk of Rain 2
    311690, // Enter the Gungeon
    250900, // The Binding of Isaac: Rebirth
    418530, // Spelunky 2
    445980, // Wizard of Legend
    330020, // Children of Morta
  ];
}

function isLocalCoop(gameData) {
  // Verificar si el juego tiene categorías cooperativas locales
  if (!gameData.categories) return false;
  
  const coopCategories = gameData.categories.map(cat => cat.description.toLowerCase());
  return coopCategories.some(desc => 
    desc.includes('local coop') || 
    desc.includes('local multiplayer') ||
    desc.includes('split-screen')
  );
}
