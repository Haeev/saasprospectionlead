// Système de gestion du thème (clair/sombre)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeType = 'light' | 'dark';

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

// Création d'un store pour gérer le thème avec persistance
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // Par défaut, on utilise le thème sombre comme dans l'image
      theme: 'dark',
      
      // Fonction pour définir le thème
      setTheme: (theme: ThemeType) => set({ theme }),
      
      // Fonction pour basculer entre les thèmes
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'theme-storage', // Nom pour le stockage local
    }
  )
);

// Hook pour appliquer le thème au document HTML
export function useTheme() {
  const { theme, toggleTheme } = useThemeStore();
  
  // Fonction pour appliquer le thème au document
  const applyTheme = () => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };
  
  return { theme, toggleTheme, applyTheme };
} 