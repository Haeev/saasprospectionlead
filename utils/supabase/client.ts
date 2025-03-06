'use client'

// Import de la fonction pour créer un client Supabase côté navigateur
import { createBrowserClient } from '@supabase/ssr'

/**
 * Crée et retourne un client Supabase pour utilisation côté client (navigateur)
 * Cette fonction est utilisée dans les composants client pour interagir avec Supabase
 */
export function createClient() {
  // Création du client avec les variables d'environnement
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // URL de l'API Supabase
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Clé anonyme pour l'authentification
  )
} 