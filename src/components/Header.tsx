import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";

const Header: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser,
    openAuthModal, 
    openSupportModal,
    language,
    setLanguage,
    t,
    isMobileMenuOpen,
    setMobileMenuOpen
  } = useApp();

  const [showDashboard, setShowDashboard] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('rockstar_current_user');
    setCurrentUser(null);
    setShowDashboard(false);
    setMobileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (currentUser) {
      setShowDashboard(true);
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-black/80 backdrop-blur-md z-50 border-b border-purple-900/30">
        {/* Left side - Logo and Language */}
        <div className="flex items-center space-x-3 md:space-x-6">
          {/* Logo */}
          <div 
            className="relative group flex items-center space-x-2 md:space-x-3 cursor-pointer" 
            onClick={currentUser ? handleDashboardClick : undefined}
          >
            <div className="relative">
              <img 
                src="https://i.postimg.cc/tJBrMhWD/1754689646303.png" 
                alt="Rockstar Logo"
                className="w-8 h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))'
                }}
              />
              <div className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <div className="text-white font-bold text-lg md:text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              Rockstar 2.0
            </div>
          </div>

          {/* Language Switcher - Desktop */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-800/50 rounded-full p-1 border border-purple-500/30">
            <button
              onClick={() => setLanguage('ru')}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                language === 'ru'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
                RU
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                language === 'en'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
                EN
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser && (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 text-sm font-semibold"
            >
              {t('header.logout')}
            </button>
          )}
          
          <button
            onClick={openSupportModal}
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 text-sm font-semibold"
          >
            {t('header.support')}
          </button>
          
          {!currentUser && (
            <button
              onClick={openAuthModal}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 text-sm font-semibold"
            >
              {t('header.auth')}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white p-2 hover:bg-purple-600/20 rounded-lg transition-colors duration-300"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-16 right-4 left-4 bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-500/25 p-6">
            {/* Language Switcher - Mobile */}
            <div className="flex items-center justify-center space-x-2 bg-gray-800/50 rounded-full p-1 border border-purple-500/30 mb-6">
              <button
                onClick={() => {
                  setLanguage('ru');
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  language === 'ru'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🇷🇺 RU
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-4">
              {currentUser && (
                <button
                  onClick={handleDashboardClick}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-4 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300 font-semibold"
                >
                  {t('header.dashboard')}
                </button>
              )}
              
              <button
                onClick={() => {
                  openSupportModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300 font-semibold"
              >
                {t('header.support')}
              </button>
              
              {!currentUser ? (
                <button
                  onClick={() => {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-4 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300 font-semibold"
                >
                  {t('header.auth')}
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-4 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300 font-semibold"
                >
                  {t('header.logout')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;