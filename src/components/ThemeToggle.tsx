'use client';

import { useEffect } from 'react';
import { useTheme } from '../../src/lib/theme';

export default function ThemeToggle() {
  const { theme, toggleTheme, applyTheme } = useTheme();
  
  // Appliquer le thème au chargement du composant
  useEffect(() => {
    applyTheme();
  }, [theme, applyTheme]);
  
  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center rounded-full bg-gray-800 dark:bg-gray-700 p-1 transition-colors duration-300"
      aria-label={`Basculer vers le mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
    >
      {/* Icône du soleil (mode clair) */}
      <span className={`absolute left-1.5 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ${theme === 'light' ? 'translate-x-10 bg-white text-yellow-500' : 'bg-transparent text-yellow-500'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      </span>
      
      {/* Icône de la lune (mode sombre) */}
      <span className={`absolute left-1.5 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-10 bg-blue-900 text-blue-200' : 'bg-transparent text-gray-400'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      </span>
    </button>
  );
} 