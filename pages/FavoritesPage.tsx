
import React from 'react';
import { useUserLists } from '../hooks/useUserLists';
import { useListedGames } from '../hooks/useListedGames';
import { GameGrid } from '../components/GameGrid';
import { Heart } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { userLists } = useUserLists();
  const { games, isLoading, error } = useListedGames(userLists.favorites);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Heart className="w-8 h-8 text-pink-400" />
        <h1 className="text-3xl md:text-4xl font-black text-white">Juegos Favoritos</h1>
      </div>
      <GameGrid games={games} isLoading={isLoading} error={error} />
    </div>
  );
};
