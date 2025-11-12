import React from 'react';
import { Game } from '../types';
import { GameCard } from './GameCard';
import { GameGridSkeleton } from './LoadingSkeletons';

interface GameGridProps {
  games: Game[];
  isLoading: boolean;
  error: Error | null;
}

export const GameGrid: React.FC<GameGridProps> = ({ games, isLoading, error }) => {
  if (isLoading) {
    return <GameGridSkeleton />;
  }

  if (error) {
    return <div className="text-center text-red-400">Error: {error.message}</div>;
  }

  if (games.length === 0) {
    return <div className="text-center text-slate-400 mt-8">No se encontraron juegos con los criterios seleccionados.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map(game => (
        <GameCard key={game.appId} game={game} />
      ))}
    </div>
  );
};
