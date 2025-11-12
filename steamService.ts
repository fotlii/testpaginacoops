import { Game } from '../types';

// Transforma la respuesta de la API de Steam a nuestro tipo 'Game'
const transformApiDataToGame = (appId: string, apiResponse: any): Game | null => {
  if (!apiResponse || !apiResponse.success || !apiResponse.data) {
    return null;
  }
  const gameData = apiResponse.data;

  let releaseDateISO = '';
  try {
      const dateStr = gameData.release_date?.date || '1 Jan, 1970';
      releaseDateISO = new Date(dateStr.replace(/,/g, '')).toISOString();
  } catch (e) {
      releaseDateISO = new Date(0).toISOString();
  }

  return {
    appId: parseInt(appId, 10),
    title: gameData.name || 'Título Desconocido',
    coverUrl: gameData.header_image,
    price: gameData.price_overview ? {
      final: gameData.price_overview.final / 100,
      currency: gameData.price_overview.currency,
      discountPercent: gameData.price_overview.discount_percent,
      isFree: gameData.is_free || false,
    } : { final: null, currency: 'EUR', discountPercent: null, isFree: gameData.is_free || false },
    shortDescription: gameData.short_description,
    longDescription: gameData.about_the_game,
    screenshots: gameData.screenshots?.map((ss: any) => ss.path_full) || [],
    movies: gameData.movies || [],
    tags: gameData.categories?.map((cat: any) => cat.description) || [],
    genres: gameData.genres || [],
    releaseDate: releaseDateISO,
  };
};

// Obtiene la lista de juegos inicial desde nuestro endpoint de búsqueda
const getGames = async (): Promise<Game[]> => {
  console.log('Buscando juegos en tiempo real via backend proxy...');
  try {
    const response = await fetch('/api/searchgames');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const searchResults: Game[] = await response.json();
    console.log(`Se encontraron ${searchResults.length} juegos.`);
    return searchResults;
  } catch (error) {
    console.error('Fallo al buscar juegos:', error);
    throw error;
  }
};

// Obtiene los detalles de un solo juego por su ID
const getGameById = async (appId: number): Promise<Game | undefined> => {
    console.log(`Obteniendo detalles para ${appId} via backend proxy...`);
  try {
    const response = await fetch(`/api/appdetails?appId=${appId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    const gameData = data[appId];
    
    const transformedGame = transformApiDataToGame(appId.toString(), gameData);
    return transformedGame ?? undefined;
  } catch (error) {
    console.error(`Fallo al obtener juego por ID ${appId}:`, error);
    throw error;
  }
};

// Obtiene los detalles de múltiples juegos (para listas)
const getGamesByIds = async (appIds: number[]): Promise<Game[]> => {
    if (appIds.length === 0) return [];
    console.log(`Obteniendo detalles para ${appIds.length} juegos via backend proxy...`);
    try {
        const response = await fetch(`/api/appdetails?appids=${appIds.join(',')}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const games = Object.entries(data)
            .map(([id, gameData]) => transformApiDataToGame(id, gameData))
            .filter(Boolean) as Game[];

        return games;
    } catch (error) {
        console.error('Fallo al obtener juegos por IDs:', error);
        throw error;
    }
};

export const steamService = {
  getGames,
  getGameById,
  getGamesByIds,
};
