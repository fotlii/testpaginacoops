
import React from 'react';

export const GameCardSkeleton: React.FC = () => (
  <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-32 bg-slate-700"></div>
    <div className="p-4">
      <div className="h-6 w-3/4 bg-slate-700 rounded mb-2"></div>
      <div className="h-4 w-1/4 bg-slate-700 rounded"></div>
    </div>
  </div>
);

export const GameGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <GameCardSkeleton key={index} />
    ))}
  </div>
);
