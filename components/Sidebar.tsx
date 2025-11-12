import React from 'react';
import { Search } from 'lucide-react';
import { Filters } from '../pages/HomePage';

interface SidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters, searchTerm, setSearchTerm }) => {
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, year: parseInt(e.target.value, 10) }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, price: parseInt(e.target.value, 10) }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, sortOrder: e.target.value }));
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="sticky top-24 space-y-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
      {/* Search */}
      <div>
        <div className="relative">
            <input 
                id="search-title"
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="space-y-6">
        <div>
            <label htmlFor="sort-order" className="block text-sm font-medium text-slate-300 mb-2">
                Ordenar por
            </label>
            <select
                id="sort-order"
                value={filters.sortOrder}
                onChange={handleSortChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: de menor a mayor</option>
                <option value="price-desc">Precio: de mayor a menor</option>
                <option value="date-desc">Fecha: más nuevos primero</option>
                <option value="date-asc">Fecha: más antiguos primero</option>
            </select>
        </div>
        <div>
          <label htmlFor="year-range" className="block text-sm font-medium text-slate-300 mb-2">
            Año de lanzamiento (desde {filters.year})
          </label>
          <input
            id="year-range"
            type="range"
            min="2010"
            max={currentYear}
            value={filters.year}
            onChange={handleYearChange}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
        <div>
          <label htmlFor="price-range" className="block text-sm font-medium text-slate-300 mb-2">
            Precio máximo (${filters.price === 61 ? 'Sin límite' : filters.price})
          </label>
           <input
            id="price-range"
            type="range"
            min="0"
            max="61" // 61 represents no limit
            step="1"
            value={filters.price}
            onChange={handlePriceChange}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};