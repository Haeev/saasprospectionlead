'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Récupérer l'utilisateur actuel
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    
    getUser();
  }, []);
  
  // Fonction pour se déconnecter
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };
  
  return (
    <nav className="theme-transition border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et liens de navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                LeadFinder
              </Link>
            </div>
            
            {/* Liens de navigation pour desktop */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/dashboard" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/dashboard' 
                    ? 'border-blue-500' 
                    : 'border-transparent hover:border-blue-300'
                }`}
              >
                Tableau de bord
              </Link>
              
              <Link 
                href="/search" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/search' 
                    ? 'border-blue-500' 
                    : 'border-transparent hover:border-blue-300'
                }`}
              >
                Recherche
              </Link>
              
              <Link 
                href="/profiles/new" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/profiles/new' 
                    ? 'border-blue-500' 
                    : 'border-transparent hover:border-blue-300'
                }`}
              >
                Nouveau profil
              </Link>
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex items-center">
            {/* Bouton de thème */}
            <div className="mr-4">
              <ThemeToggle />
            </div>
            
            {/* Bouton de notification */}
            <button className="p-2 rounded-full theme-transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button>
            
            {/* Profil utilisateur */}
            <div className="ml-3 relative">
              <div>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {user ? (
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full flex items-center justify-center theme-transition">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
              
              {/* Menu déroulant du profil */}
              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 theme-transition z-10">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm border-b theme-transition">
                        {user.email}
                      </div>
                      <Link 
                        href="/settings" 
                        className="block px-4 py-2 text-sm theme-transition"
                      >
                        Paramètres
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm theme-transition"
                      >
                        Se déconnecter
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login" 
                        className="block px-4 py-2 text-sm theme-transition"
                      >
                        Se connecter
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Bouton de menu mobile */}
            <div className="flex items-center sm:hidden ml-4">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md theme-transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/dashboard" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium theme-transition ${
                pathname === '/dashboard' 
                  ? 'border-blue-500' 
                  : 'border-transparent'
              }`}
            >
              Tableau de bord
            </Link>
            
            <Link 
              href="/search" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium theme-transition ${
                pathname === '/search' 
                  ? 'border-blue-500' 
                  : 'border-transparent'
              }`}
            >
              Recherche
            </Link>
            
            <Link 
              href="/profiles/new" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium theme-transition ${
                pathname === '/profiles/new' 
                  ? 'border-blue-500' 
                  : 'border-transparent'
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