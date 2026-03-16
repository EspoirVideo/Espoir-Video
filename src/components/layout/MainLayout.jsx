import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Film, LogOut, User } from 'lucide-react';

const MainLayout = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col">
      {/* Barre de navigation */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-wider text-primary">ESPOIR VIDEO</span>
            </Link>

            <nav className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-textMuted text-sm flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user?.phone || 'Abonne'}</span>
                  </span>
                  <button 
                    onClick={logout}
                    className="text-textMuted hover:text-primary transition-colors duration-300 flex items-center space-x-1"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="hidden sm:inline">Deconnexion</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-primary hover:bg-opacity-80 text-white px-4 py-2 rounded font-medium transition-all duration-300"
                >
                  Connexion
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal dynamique (Outlet) */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-textMuted text-sm">
          &copy; {new Date().getFullYear()} Espoir Video. Tous droits reserves.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;