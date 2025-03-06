import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeadFinder SaaS - Prospection et génération de leads',
  description: 'Application SaaS pour la gestion de leads de prospection commerciale',
};

/**
 * Composant de layout racine
 * Définit la structure de base de toutes les pages de l'application
 * 
 * @param children - Les composants enfants à rendre à l'intérieur du layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const theme = localStorage.getItem('theme-storage');
                if (theme) {
                  const parsedTheme = JSON.parse(theme);
                  if (parsedTheme.state && parsedTheme.state.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } else {
                  // Par défaut, utiliser le thème sombre
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                // En cas d'erreur, utiliser le thème sombre par défaut
                document.documentElement.classList.add('dark');
              }
            })();
          `
        }} />
      </head>
      <body className={`${inter.className} h-full theme-transition`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 