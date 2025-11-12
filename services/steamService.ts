import { Game, GamePrice } from '../types';
import { recommendedAppIds } from './mockData';

// La URL base de la API ahora apunta a nuestro propio proxy backend
const API_BASE_URL = '/api';

// Helper to transform the raw API data into our Game type
const transformApiDataToGame = (apiData: any): Game | null => {
  // Add a guard to ensure essential data like 'name' exists
  if (!apiData || !apiData.name) return null;

  const price: GamePrice = {
    currency: apiData.price_overview?.currency || 'USD',
    isFree: apiData.is_free,
    final: apiData.price_overview ? apiData.price_overview.final / 100 : 0,
    discountPercent: apiData.price_overview?.discount_percent || 0,
  };
   
  // Combine categories and genres into a single tag list for display
  const tags = [];
  if (apiData.categories) {
    tags.push(...apiData.categories.map((cat: any) => cat.description));
  }
  if (apiData.genres) {
    tags.push(...apiData.genres.map((gen: any) => gen.description));
  }

  return {
    appId: apiData.steam_appid,
    title: apiData.name,
    coverUrl: apiData.header_image,
    price,
    shortDescription: apiData.short_description,
    longDescription: apiData.detailed_description?.replace(/<[^>]*>?/gm, '') || '',
    screenshots: apiData.screenshots?.map((ss: any) => ss.path_full) || [],
    movies: apiData.movies || [],
    tags: tags.slice(0, 10), // Limit tags to a reasonable number
    genres: apiData.genres || [],
    releaseDate: apiData.release_date?.date ? new Date(apiData.release_date.date).toISOString() : new Date().toISOString(),
  };
};

export const steamService = {
  getGames: async (): Promise<Game[]> => {
    console.log("Fetching curated list of games via backend proxy...");
    const uniqueAppIds = [...new Set(recommendedAppIds)];
    return await steamService.getGamesByIds(uniqueAppIds);
  },

  getGameById: async (appId: number): Promise<Game | undefined> => {
    console.log(`Fetching game ${appId} for Spain via backend proxy...`);
    try {
      // Point to the local backend proxy, which will forward the request
      const apiUrl = `${API_BASE_URL}/appdetails?appids=${appId}&cc=es&l=spanish`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const gameData = data[appId];
      
      if (gameData && gameData.success) {
        return transformApiDataToGame(gameData.data) || undefined;
      }
      return undefined;
    } catch (error) {
      console.error(`Failed to fetch game ${appId}:`, error);
      throw error;
    }
  },

  getGamesByIds: async (appIds: number[]): Promise<Game[]> => {
    if (appIds.length === 0) return [];
    console.log(`Fetching ${appIds.length} games in batches via backend proxy...`);
    
    const CHUNK_SIZE = 15;
    const allGames: Game[] = [];

    try {
      for (let i = 0; i < appIds.length; i += CHUNK_SIZE) {
        const chunk = appIds.slice(i, i + CHUNK_SIZE);
        console.log(`Fetching batch: ${chunk.join(',')}`);

        // With a stable backend proxy, we can safely re-add localization to batch requests
        const apiUrl = `${API_BASE_URL}/appdetails?appids=${chunk.join(',')}&cc=es&l=spanish`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          console.error(`HTTP error on chunk ${chunk.join(',')}: status ${response.status}`);
          continue; 
        }

        const data = await response.json();
        
        const gamesFromChunk: Game[] = Object.values(data)
          .filter((gameData: any) => gameData.success)
          .map((gameData: any) => transformApiDataToGame(gameData.data))
          .filter((game): game is Game => game !== null);
          
        allGames.push(...gamesFromChunk);
        
        // Keep a small delay to be respectful to the Steam API
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      console.log(`Successfully fetched ${allGames.length} valid games.`);
      return allGames;

    } catch (error) {
       console.error(`Failed to fetch games by IDs:`, error);
       throw error;
    }
  }
};
