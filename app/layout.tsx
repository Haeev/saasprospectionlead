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
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 