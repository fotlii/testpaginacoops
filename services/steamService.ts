
import { Game } from '../types';
import { mockGames } from './mockData';

const FAKE_DELAY = 500; // ms

const getGames = (): Promise<Game[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      // Return a copy to prevent mutations in the mock data source
      resolve([...mockGames]);
    }, FAKE_DELAY);
  });
};

const getGameById = (appId: number): Promise<Game | undefined> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const game = mockGames.find(g => g.appId === appId);
            resolve(game);
        }, FAKE_DELAY);
    });
};

const getGamesByIds = (appIds: number[]): Promise<Game[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const games = mockGames.filter(g => appIds.includes(g.appId));
            resolve(games);
        }, FAKE_DELAY);
    });
};


export const steamService = {
  getGames,
  getGameById,
  getGamesByIds,
};
