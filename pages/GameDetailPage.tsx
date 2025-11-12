
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Game } from '../types';
import { steamService } from '../services/steamService';
import { ArrowLeft, Tag, Clapperboard, Camera } from 'lucide-react';

export const GameDetailPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!appId) return;
      try {
        setIsLoading(true);
        const gameData = await steamService.getGameById(parseInt(appId, 10));
        if (gameData) {
          setGame(gameData);
        } else {
          setError(new Error('Game not found'));
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchGame();
  }, [appId]);
  
    if (isLoading) {
        return (
             <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

  if (error) {
    return <div className="text-center text-red-400">Error: {error.message}</div>;
  }

  if (!game) {
    return <div className="text-center text-slate-400">Juego no encontrado.</div>;
  }

  return (
    <div className="space-y-8">
      <Link to="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
        <ArrowLeft size={20} />
        Volver a las recomendaciones
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
            <img src={game.coverUrl} alt={game.title} className="w-full rounded-lg shadow-lg shadow-black/30" />
            <div className="mt-4 bg-slate-800/50 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Detalles</h2>
                <p><strong>Géneros:</strong> {game.genres.map(g => g.description).join(', ')}</p>
                <p><strong>Lanzamiento:</strong> {new Date(game.releaseDate).toLocaleDateString()}</p>
            </div>
        </div>

        <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-white">{game.title}</h1>
            <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">Descripción</h2>
                <p className="text-slate-300 whitespace-pre-wrap">{game.longDescription}</p>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2"><Tag size={20}/> Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {game.tags.map(tag => (
                        <span key={tag} className="bg-slate-700 text-slate-300 text-sm font-medium px-3 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>

            {game.movies.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2"><Clapperboard size={20}/> Trailers</h3>
                    {/* In a real app, this would be an embedded video player */}
                    <img src={game.movies[0].thumbnail} alt={game.movies[0].name} className="w-full max-w-lg rounded-lg shadow-md" />
                </div>
            )}

            {game.screenshots.length > 0 && (
                <div>
                     <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2"><Camera size={20}/> Capturas de Pantalla</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {game.screenshots.map((ss, index) => (
                             <img key={index} src={ss} alt={`Screenshot ${index + 1}`} className="w-full rounded-lg shadow-md" />
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
