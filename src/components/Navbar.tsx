'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    <nav className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-brand">
          LeadFinder
        </Link>
        
        {/* Navigation desktop */}
        <div className="hidden md:flex navbar-nav">
          <Link 
            href="/" 
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            Accueil
          </Link>
          
          {user && (
            <>
              <Link 
                href="/dashboard" 
                className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}
              >
                Tableau de bord
              </Link>
              
              <Link 
                href="/search" 
                className={`nav-link ${pathname === '/search' ? 'active' : ''}`}
              >
                Recherche
              </Link>
              
              <Link 
                href="/leads" 
                className={`nav-link ${pathname === '/leads' ? 'active' : ''}`}
              >
                Leads
              </Link>
            </>
          )}
        </div>
        
        {/* Actions utilisateur */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="btn btn-secondary btn-sm"
              >
                Se connecter
              </Link>
              <Link 
                href="/login?signup=true" 
                className="btn btn-primary btn-sm"
              >
                S'inscrire
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  {user.email?.split('@')[0] || 'Utilisateur'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                    {user.email}
                  </div>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mon profil
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Paramètres
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Bouton menu mobile */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 mt-2">
          <div className="container py-2">
            <Link 
              href="/" 
              className={`block py-2 ${pathname === '/' ? 'text-primary' : 'text-gray-700'}`}
            >
              Accueil
            </Link>
            
            {user && (
              <>
                <Link 
                  href="/dashboard" 
                  className={`block py-2 ${pathname === '/dashboard' ? 'text-primary' : 'text-gray-700'}`}
                >
                  Tableau de bord
                </Link>
                
                <Link 
                  href="/search" 
                  className={`block py-2 ${pathname === '/search' ? 'text-primary' : 'text-gray-700'}`}
                >
                  Recherche
                </Link>
                
                <Link 
                  href="/leads" 
                  className={`block py-2 ${pathname === '/leads' ? 'text-primary' : 'text-gray-700'}`}
                >
                  Leads
                </Link>
                
                <Link 
                  href="/profile" 
                  className={`block py-2 ${pathname === '/profile' ? 'text-primary' : 'text-gray-700'}`}
                >
                  Mon profil
                </Link>
                
                <Link 
                  href="/settings" 
                  className={`block py-2 ${pathname === '/settings' ? 'text-primary' : 'text-gray-700'}`}
                >
                  Paramètres
                </Link>
                
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left py-2 text-gray-700"
                >
                  Se déconnecter
                </button>
              </>
            )}
            
            {!user && (
              <div className="flex gap-2 mt-2">
                <Link 
                  href="/login" 
                  className="btn btn-secondary btn-sm"
                >
                  Se connecter
                </Link>
                <Link 
                  href="/login?signup=true" 
                  className="btn btn-primary btn-sm"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 