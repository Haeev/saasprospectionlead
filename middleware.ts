import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

/**
 * Middleware Next.js exécuté à chaque requête
 * Gère la mise à jour de la session Supabase
 * 
 * @param request - La requête entrante
 * @returns La réponse modifiée avec les cookies de session mis à jour
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

/**
 * Configuration du middleware pour spécifier sur quelles routes il s'applique
 * Exclut les fichiers statiques et les images pour des raisons de performance
 */
export const config = {
  matcher: [
    /*
     * Correspond à tous les chemins de requête sauf ceux commençant par:
     * - _next/static (fichiers statiques)
     * - _next/image (fichiers d'optimisation d'image)
     * - favicon.ico (fichier favicon)
     * Vous pouvez modifier ce modèle pour inclure plus de chemins.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 