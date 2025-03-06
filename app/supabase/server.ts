import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Type pour les fonctions de gestion des cookies
interface CookieHandler {
  get(name: string): string | undefined;
  set(name: string, value: string, options: CookieOptions): void;
  remove(name: string, options: CookieOptions): void;
}

/**
 * Crée et retourne un client Supabase pour utilisation côté serveur
 * Cette fonction est utilisée dans les composants serveur et les Server Actions
 */
export const createClient = async () => {
  // Récupération du gestionnaire de cookies de Next.js
  const cookieStore = cookies()

  // Création du client Supabase avec gestion des cookies
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // URL de l'API Supabase
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Clé anonyme pour l'authentification
    {
      // Configuration des cookies pour maintenir la session
      cookies: {
        // Fonction pour récupérer un cookie par son nom
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // Fonction pour définir un cookie
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        // Fonction pour supprimer un cookie
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      } as CookieHandler, // Utilisation d'une interface pour éviter le type any
    }
  )
} 