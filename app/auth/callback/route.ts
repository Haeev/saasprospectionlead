import { createClient } from '../../../utils/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Gestionnaire de route GET pour la callback d'authentification
 * Cette route est appelée après qu'un utilisateur a confirmé son email
 * 
 * @param request - L'objet Request contenant les paramètres de la requête
 * @returns Une redirection vers la page d'accueil ou d'erreur
 */
export async function GET(request: Request) {
  try {
    // Extraction de l'URL et du code d'authentification
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') || '/'
    const type = requestUrl.searchParams.get('type')

    // Si un code est présent, échange le code contre une session
    if (code) {
      // Création du client Supabase
      const supabase = await createClient()
      
      // Échange du code contre une session
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      // Si une erreur se produit, redirigez vers la page de connexion avec un message d'erreur
      if (error) {
        console.error('Erreur lors de l\'échange du code:', error.message)
        return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`)
      }
    }

    // Redirection vers la page d'accueil après la fin du processus d'authentification
    return NextResponse.redirect(`${requestUrl.origin}${next}`)
  } catch (error) {
    // En cas d'erreur inattendue, redirigez vers la page de connexion avec un message d'erreur
    console.error('Erreur inattendue dans la route de callback:', error)
    return NextResponse.redirect(`${new URL(request.url).origin}/login?error=Une erreur inattendue s'est produite`)
  }
} 