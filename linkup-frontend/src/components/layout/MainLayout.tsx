/**
 * Main app layout with bottom navigation
 */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import linkupLogo from '../../assets/linkuplogo.png';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMatchPage = location.pathname === '/match';
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-center">
          <img
            src={linkupLogo}
            alt="LinkUp"
            className="h-8 w-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          <button
            onClick={() => navigate('/match')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors ${
              isMatchPage
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-xl">♥</span>
            <span className="text-xs font-medium">Match</span>
          </button>

          <button
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors ${
              isProfilePage
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-xl">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;