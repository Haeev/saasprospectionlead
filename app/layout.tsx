import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

// Utilisation de la police Inter pour tout le site
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
      <body className={`${inter.className} h-full`}>
        {/* Éléments flottants décoratifs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Cercle décoratif en haut à droite */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20 animate-float"></div>
          
          {/* Cercle décoratif en bas à gauche */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-100 rounded-full filter blur-3xl opacity-20 animate-float delay-200"></div>
          
          {/* Points décoratifs */}
          <div className="absolute top-1/4 left-1/4 w-full h-full dot-pattern opacity-30"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 