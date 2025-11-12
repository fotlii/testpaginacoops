import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalItems: number;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  setPageSize,
  totalItems
}) => {
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value, 10));
    onPageChange(1); // Reset to first page
  };
  
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 py-4 border-t border-slate-700">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span>Resultados por página:</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="bg-slate-800 border border-slate-600 rounded-md px-2 py-1 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span className="hidden sm:inline-block">|</span>
        <span>
            Mostrando {startItem}-{endItem} de {totalItems}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        <span className="text-sm text-slate-400">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
