
import React from 'react';
import { useUserLists } from '../hooks/useUserLists';
import { useListedGames } from '../hooks/useListedGames';
import { GameGrid } from '../components/GameGrid';
import { XCircle } from 'lucide-react';

export const DiscardedPage: React.FC = () => {
  const { userLists } = useUserLists();
  const { games, isLoading, error } = useListedGames(userLists.discarded);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <XCircle className="w-8 h-8 text-red-400" />
        <h1 className="text-3xl md:text-4xl font-black text-white">Juegos Descartados</h1>
      </div>
      <GameGrid games={games} isLoading={isLoading} error={error} />
    </div>
  );
};
