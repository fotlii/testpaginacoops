import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Game, ListType } from '../types';
import { useUserLists } from '../hooks/useUserLists';
import { Heart, CheckCircle, XCircle, PlusCircle } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const getCurrencySymbol = (currencyCode: string) => {
    switch (currencyCode?.toUpperCase()) {
        case 'EUR': return '€';
        case 'USD': return '$';
        case 'GBP': return '£';
        default: return currencyCode;
    }
};

const PriceDisplay: React.FC<{ price: Game['price'] }> = ({ price }) => {
    const symbol = getCurrencySymbol(price.currency);

    if (price.isFree) {
        return <div className="text-lg font-bold text-green-400">Gratis</div>;
    }
    if (price.discountPercent && price.discountPercent > 0) {
        const originalPrice = price.final ? price.final / (1 - price.discountPercent / 100) : 0;
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm line-through text-slate-500">{originalPrice.toFixed(2)}{symbol}</span>
                <span className="text-lg font-bold text-green-400">{price.final?.toFixed(2)}{symbol}</span>
                <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded">
                    -{price.discountPercent}%
                </span>
            </div>
        );
    }
    return <div className="text-lg font-bold text-cyan-400">{price.final?.toFixed(2)}{symbol}</div>;
};

const ListActionButton: React.FC<{ appId: number, list: ListType, icon: React.ReactNode, text: string }> = ({ appId, list, icon, text }) => {
    const { addToList } = useUserLists();
    return (
        <button onClick={(e) => { e.stopPropagation(); addToList(appId, list); }} className="flex-1 text-center py-2 px-2 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all rounded-md flex flex-col items-center justify-center text-xs gap-1">
            {icon}
            <span>{text}</span>
        </button>
    );
};

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();
  const { isGameInAnyList, removeFromList } = useUserLists();
  const [isHovered, setIsHovered] = useState(false);
  const gameStatus = isGameInAnyList(game.appId);

  const handleCardClick = () => {
    navigate(`/juego/${game.appId}`);
  };
  
  const getStatusBadge = () => {
    if (!gameStatus) return null;
    
    const statusMap = {
        favorites: { icon: <Heart className="w-4 h-4" />, text: 'Favorito', color: 'bg-pink-500/20 text-pink-300' },
        played: { icon: <CheckCircle className="w-4 h-4" />, text: 'Jugado', color: 'bg-green-500/20 text-green-300' },
        discarded: { icon: <XCircle className="w-4 h-4" />, text: 'Descartado', color: 'bg-red-500/20 text-red-300' },
    };
    
    const { icon, text, color } = statusMap[gameStatus];
    
    return (
        <div className={`absolute top-2 right-2 flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${color}`}>
            {icon}
            <button 
                onClick={(e) => { e.stopPropagation(); removeFromList(game.appId, gameStatus); }}
                className="opacity-60 hover:opacity-100"
            >
                <XCircle className="w-4 h-4" />
            </button>
        </div>
    );
  };

  return (
    <div 
        className="group relative bg-slate-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-cyan-500/20"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <img 
            src={game.coverUrl} 
            alt={game.title} 
            className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {getStatusBadge()}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="p-4 absolute bottom-0 left-0 right-0">
             <h3 className="text-lg font-bold text-white truncate group-hover:text-cyan-300 transition-colors">{game.title}</h3>
        </div>
        
        <div className={`absolute inset-0 bg-slate-900/95 p-4 flex flex-col justify-between transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-2">{game.title}</h3>
                <p className="text-sm text-slate-300 line-clamp-3">{game.shortDescription}</p>
            </div>
            
            <div className="space-y-3">
                 <PriceDisplay price={game.price} />
                <div className="border-t border-slate-700 pt-2 flex items-center justify-around gap-2">
                    <ListActionButton appId={game.appId} list="favorites" icon={<Heart size={20} />} text="Favorito"/>
                    <ListActionButton appId={game.appId} list="played" icon={<CheckCircle size={20} />} text="Jugado"/>
                    <ListActionButton appId={game.appId} list="discarded" icon={<XCircle size={20} />} text="Descartar"/>
                </div>
            </div>
        </div>
    </div>
  );
};