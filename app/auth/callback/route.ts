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
  // Extraction de l'URL et du code d'authentification
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  // Si un code est présent, échange le code contre une session
  if (code) {
    // Création du client Supabase
    const supabase = await createClient()
    // Échange du code contre une session
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirection vers la page d'accueil après la fin du processus d'authentification
  return NextResponse.redirect(requestUrl.origin)
} 