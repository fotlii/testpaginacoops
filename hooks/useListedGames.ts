
import { useState, useEffect } from 'react';
import { Game } from '../types';
import { steamService } from '../services/steamService';

export const useListedGames = (appIds: number[]) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchListedGames = async () => {
      if (appIds.length === 0) {
        setGames([]);
        return;
      }
      try {
        setIsLoading(true);
        const listedGames = await steamService.getGamesByIds(appIds);
        setGames(listedGames);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchListedGames();
  }, [appIds]);

  return { games, isLoading, error };
};
