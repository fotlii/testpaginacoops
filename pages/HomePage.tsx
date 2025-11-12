import React, { useState, useEffect, useMemo } from 'react';
import { Game } from '../types';
import { steamService } from '../services/steamService';
import { GameGrid } from '../components/GameGrid';
import { Sidebar } from '../components/Sidebar';
import { PaginationControls } from '../components/PaginationControls';

export interface Filters {
  year: number;
  price: number;
  sortOrder: string;
}

export const HomePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<Filters>({
    year: 2010,
    price: 61, // 61 represents no limit
    sortOrder: 'relevance',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const allGames = await steamService.getGames();
        setGames(allGames);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  const filteredAndSortedGames = useMemo(() => {
    // Reset to page 1 whenever filters change
    setCurrentPage(1);

    const gamesToProcess = games
      .filter(game => {
        const releaseYear = new Date(game.releaseDate).getFullYear();
        return releaseYear >= filters.year;
      })
      .filter(game => {
        if (filters.price === 61) return true; // No limit
        if (game.price.isFree) return filters.price >= 0;
        return game.price.final !== null && game.price.final <= filters.price;
      })
      .filter(game => {
          return game.title.toLowerCase().includes(searchTerm.toLowerCase());
      });

    switch (filters.sortOrder) {
        case 'price-asc':
            gamesToProcess.sort((a, b) => {
                const priceA = a.price.isFree ? 0 : a.price.final ?? Infinity;
                const priceB = b.price.isFree ? 0 : b.price.final ?? Infinity;
                return priceA - priceB;
            });
            break;
        case 'price-desc':
            gamesToProcess.sort((a, b) => {
                const priceA = a.price.isFree ? 0 : a.price.final ?? -Infinity;
                const priceB = b.price.isFree ? 0 : b.price.final ?? -Infinity;
                return priceB - priceA;
            });
            break;
        case 'date-desc':
            gamesToProcess.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
            break;
        case 'date-asc':
            gamesToProcess.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
            break;
        case 'relevance':
        default:
            // The mock data is already sorted by relevance (ID)
            gamesToProcess.sort((a, b) => a.appId - b.appId);
            break;
    }

    return gamesToProcess;
  }, [games, filters, searchTerm]);
  
  const totalPages = Math.ceil(filteredAndSortedGames.length / pageSize);
  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedGames.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, filteredAndSortedGames]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        <h1 className="text-3xl md:text-4xl font-black text-white">Recomendaciones de Juegos</h1>
        <p className="text-slate-400 max-w-3xl">
            Juegos con soporte para <span className="font-semibold text-cyan-300">cooperativo local</span>, 
            compatibles con <span className="font-semibold text-cyan-300">mando</span>, y del género 
            <span className="font-semibold text-cyan-300"> Roguelike/Roguelite</span>. Usa los filtros para afinar tu búsqueda.
        </p>
        <GameGrid games={paginatedGames} isLoading={isLoading} error={error} />
        {!isLoading && filteredAndSortedGames.length > 0 && (
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalItems={filteredAndSortedGames.length}
            />
        )}
      </div>
      
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Sidebar
            filters={filters}
            setFilters={setFilters}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
};
