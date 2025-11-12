
import React from 'react';
import { HashRouter, Routes, Route, Outlet, NavLink } from 'react-router-dom';
import { Gamepad2, Heart, CheckCircle, XCircle, Home as HomeIcon } from 'lucide-react';

import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { PlayedPage } from './pages/PlayedPage';
import { DiscardedPage } from './pages/DiscardedPage';
import { GameDetailPage } from './pages/GameDetailPage';
import { UserListsProvider } from './context/UserListsContext';

const Layout: React.FC = () => {
    const navLinkClasses = "flex flex-col items-center justify-center gap-1 px-4 py-2 text-slate-400 hover:text-white transition-colors duration-200";
    const activeNavLinkClasses = "text-white bg-slate-700/50 rounded-lg";
    
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col">
            <header className="sticky top-0 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 z-50">
                <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <NavLink to="/" className="flex items-center gap-3 text-2xl font-bold text-white">
                        <Gamepad2 className="w-8 h-8 text-cyan-400" />
                        <span>GameRecs</span>
                    </NavLink>
                     <div className="hidden md:flex items-center space-x-2">
                        <NavLink to="/" className={({isActive}) => `${navLinkClasses.replace('flex-col', '')} ${isActive ? activeNavLinkClasses : ''}`}>
                             <HomeIcon size={20} className="mr-2"/> Home
                        </NavLink>
                        <NavLink to="/favoritos" className={({isActive}) => `${navLinkClasses.replace('flex-col', '')} ${isActive ? activeNavLinkClasses : ''}`}>
                           <Heart size={20} className="mr-2" /> Favoritos
                        </NavLink>
                        <NavLink to="/ya-jugados" className={({isActive}) => `${navLinkClasses.replace('flex-col', '')} ${isActive ? activeNavLinkClasses : ''}`}>
                             <CheckCircle size={20} className="mr-2"/> Ya Jugados
                        </NavLink>
                        <NavLink to="/descartados" className={({isActive}) => `${navLinkClasses.replace('flex-col', '')} ${isActive ? activeNavLinkClasses : ''}`}>
                           <XCircle size={20} className="mr-2" /> Descartados
                        </NavLink>
                    </div>
                </nav>
            </header>
            
            <main className="flex-grow container mx-auto p-4 md:p-6">
                <Outlet />
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 grid grid-cols-4 z-50">
                <NavLink to="/" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses.replace('rounded-lg', 'rounded-t-lg') : ''}`}>
                    <HomeIcon size={24} /> <span className="text-xs">Home</span>
                </NavLink>
                <NavLink to="/favoritos" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses.replace('rounded-lg', 'rounded-t-lg') : ''}`}>
                    <Heart size={24} /> <span className="text-xs">Favoritos</span>
                </NavLink>
                <NavLink to="/ya-jugados" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses.replace('rounded-lg', 'rounded-t-lg') : ''}`}>
                    <CheckCircle size={24} /> <span className="text-xs">Jugados</span>
                </NavLink>
                <NavLink to="/descartados" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses.replace('rounded-lg', 'rounded-t-lg') : ''}`}>
                    <XCircle size={24} /> <span className="text-xs">Descartados</span>
                </NavLink>
            </nav>
            <div className="h-20 md:hidden"></div> {/* Spacer for mobile nav */}
        </div>
    );
};


function App() {
  return (
    <UserListsProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="favoritos" element={<FavoritesPage />} />
            <Route path="ya-jugados" element={<PlayedPage />} />
            <Route path="descartados" element={<DiscardedPage />} />
            <Route path="juego/:appId" element={<GameDetailPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </UserListsProvider>
  );
}

export default App;
