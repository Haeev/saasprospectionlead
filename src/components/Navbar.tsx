'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Récupérer l'utilisateur actuel
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    
    getUser();
    
    // Ajouter l'effet de scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fonction pour se déconnecter
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };
  
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-2 glass-effect' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo et liens de navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-2">
                L
              </div>
              <span className="text-xl font-bold text-gradient">LeadFinder</span>
            </Link>
            
            {/* Liens de navigation pour desktop */}
            <div className="hidden md:flex ml-10 space-x-8">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-all duration-300 hover:text-indigo-600 ${
                  pathname === '/' ? 'text-indigo-600' : 'text-gray-700'
                }`}
              >
                Accueil
              </Link>
              
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium transition-all duration-300 hover:text-indigo-600 ${
                  pathname === '/dashboard' ? 'text-indigo-600' : 'text-gray-700'
                }`}
              >
                Tableau de bord
              </Link>
              
              <Link 
                href="/search" 
                className={`text-sm font-medium transition-all duration-300 hover:text-indigo-600 ${
                  pathname === '/search' ? 'text-indigo-600' : 'text-gray-700'
                }`}
              >
                Recherche
              </Link>
              
              <Link 
                href="/profiles/new" 
                className={`text-sm font-medium transition-all duration-300 hover:text-indigo-600 ${
                  pathname === '/profiles/new' ? 'text-indigo-600' : 'text-gray-700'
                }`}
              >
                Nouveau profil
              </Link>
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex items-center space-x-4">
            {/* Bouton de notification */}
            {user && (
              <button className="p-2 rounded-full hover:bg-indigo-50 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>
            )}
            
            {/* Boutons de connexion/inscription pour utilisateurs non connectés */}
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link 
                  href="/login?signup=true" 
                  className="btn-primary text-sm py-2 px-4"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              /* Profil utilisateur */
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-indigo-50 transition-colors duration-300"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                
                {/* Menu déroulant du profil */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 bg-white border border-gray-100 animate-fade-in z-10">
                    <div className="px-4 py-2 text-sm border-b border-gray-100">
                      {user.email}
                    </div>
                    <Link 
                      href="/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                    >
                      Paramètres
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Bouton de menu mobile */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-indigo-50 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-effect mt-2 rounded-xl mx-4 animate-fade-in">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Accueil
            </Link>
            
            <Link 
              href="/dashboard" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/dashboard' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Tableau de bord
            </Link>
            
            <Link 
              href="/search" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/search' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Recherche
            </Link>
            
            <Link 
              href="/profiles/new" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/profiles/new' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Nouveau profil
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 