import { Game, GamePrice } from '../types';

const API_BASE_URL = '/api';

const transformApiDataToGame = (apiData: any): Game | null => {
  if (!apiData || !apiData.name || !apiData.appid) return null;

  const price: GamePrice = {
    currency: apiData.price?.currency || 'USD',
    isFree: apiData.price?.final === 0,
    final: apiData.price ? apiData.price.final / 100 : 0,
    discountPercent: apiData.price?.discount_percent || 0,
  };

  const tags = apiData.tags || [];

  return {
    appId: apiData.appid,
    title: apiData.name,
    coverUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${apiData.appid}/header.jpg`,
    price,
    shortDescription: apiData.short_description || '',
    longDescription: '', // This info is not available in search results
    screenshots: [],
    movies: [],
    tags,
    genres: apiData.genres || [],
    releaseDate: new Date(apiData.release_date * 1000).toISOString(),
  };
};

export const steamService = {
  getGames: async (): Promise<Game[]> => {
    console.log("Fetching real-time search results via backend proxy...");
    try {
      const response = await fetch(`${API_BASE_URL}/searchgames`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.success && Array.isArray(data.games)) {
        const games = data.games
          .map(transformApiDataToGame)
          .filter((game): game is Game => game !== null);
        console.log(`Successfully fetched ${games.length} games from search.`);
        return games;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch games from search:", error);
      throw error;
    }
  },

  getGameById: async (appId: number): Promise<Game | undefined> => {
     console.log(`Fetching game ${appId} for Spain via backend proxy...`);
    try {
      // NOTE: The appdetails endpoint is no longer proxied by server.js,
      // as the primary data source is now searchgames. 
      // This call might fail in local dev unless appdetails is also proxied.
      // For now, we assume it works in production via Vercel's proxy.
      const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
      const STEAM_API_URL = `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=es&l=spanish`;
      const response = await fetch(PROXY_URL + STEAM_API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const gameData = data[appId];
      
      if (gameData && gameData.success) {
        // A more complete transform for the detail page
        const detailedGame = gameData.data;
        return {
           appId: detailedGame.steam_appid,
            title: detailedGame.name,
            coverUrl: detailedGame.header_image,
            price: {
                currency: detailedGame.price_overview?.currency || 'EUR',
                isFree: detailedGame.is_free,
                final: detailedGame.price_overview ? detailedGame.price_overview.final / 100 : 0,
                discountPercent: detailedGame.price_overview?.discount_percent || 0,
            },
            shortDescription: detailedGame.short_description,
            longDescription: detailedGame.detailed_description?.replace(/<[^>]*>?/gm, '') || '',
            screenshots: detailedGame.screenshots?.map((ss: any) => ss.path_full) || [],
            movies: detailedGame.movies || [],
            tags: (detailedGame.categories?.map((c:any) => c.description) || []).slice(0, 10),
            genres: detailedGame.genres || [],
            releaseDate: new Date(detailedGame.release_date?.date).toISOString(),
        };
      }
      return undefined;
    } catch (error) {
      console.error(`Failed to fetch game ${appId}:`, error);
      throw error;
    }
  },
  
  // This function is kept for pages that need to fetch lists of games by ID.
  getGamesByIds: async (appIds: number[]): Promise<Game[]> => {
     if (appIds.length === 0) return [];
      console.log(`Fetching ${appIds.length} games for list pages...`);
      // This will fetch full details for each game in the list.
      // It can be slow if lists are long.
      const gamePromises = appIds.map(id => steamService.getGameById(id));
      const results = await Promise.allSettled(gamePromises);
      
      return results
        .filter(result => result.status === 'fulfilled' && result.value)
        .map(result => (result as PromiseFulfilledResult<Game>).value);
  }
};
