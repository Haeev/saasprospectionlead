import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Fonction pour mettre à jour la session Supabase dans le middleware
 * Cette fonction est appelée à chaque requête pour maintenir la session utilisateur
 * 
 * @param request - La requête entrante
 * @returns La réponse modifiée avec les cookies de session mis à jour
 */
export async function updateSession(request: NextRequest) {
  // Création d'une réponse initiale
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Création du client Supabase pour le middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Configuration des cookies pour maintenir la session
      cookies: {
        // Fonction pour récupérer un cookie par son nom
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        // Fonction pour définir un cookie
        set(name: string, value: string, options: CookieOptions) {
          // Définir le cookie dans la requête
          request.cookies.set({
            name,
            value,
            ...options,
          })
          // Créer une nouvelle réponse
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // Définir le cookie dans la réponse
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        // Fonction pour supprimer un cookie
        remove(name: string, options: CookieOptions) {
          // Supprimer le cookie de la requête
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          // Créer une nouvelle réponse
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // Supprimer le cookie de la réponse
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Récupérer l'utilisateur pour rafraîchir la session
  await supabase.auth.getUser()

  // Retourner la réponse avec les cookies mis à jour
  return response
} 