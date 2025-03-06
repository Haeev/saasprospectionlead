import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Prospection Lead',
  description: 'Application SaaS pour la gestion de leads de prospection commerciale',
}

/**
 * Composant de layout racine
 * Définit la structure de base de toutes les pages de l'application
 * 
 * @param children - Les composants enfants à rendre à l'intérieur du layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* Rendu des composants enfants */}
        {children}
      </body>
    </html>
  )
} 