import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

/**
 * Composant de la page d'accueil
 * Affiche différents contenus selon que l'utilisateur est connecté ou non
 */
export default async function Home() {
  // Création du client Supabase
  const supabase = await createClient()
  // Récupération des informations de l'utilisateur connecté
  const { data: { user } } = await supabase.auth.getUser()

  /**
   * Fonction de déconnexion
   * Utilise une action serveur pour déconnecter l'utilisateur
   */
  const signOut = async () => {
    'use server'
    // Création du client Supabase
    const supabase = await createClient()
    // Déconnexion de l'utilisateur
    await supabase.auth.signOut()
    // Redirection vers la page de connexion
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        {/* Titre de l'application */}
        <h1 className="text-4xl font-bold mb-8 text-center">SaaS Prospection Lead</h1>
        
        {/* Contenu conditionnel selon l'état de connexion */}
        {user ? (
          // Affichage pour un utilisateur connecté
          <div className="bg-white p-8 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Bienvenue, {user.email}</h2>
            <p className="mb-4">Vous êtes connecté à votre compte.</p>
            {/* Formulaire de déconnexion */}
            <form action={signOut}>
              <button 
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        ) : (
          // Affichage pour un utilisateur non connecté
          <div className="bg-white p-8 rounded-lg shadow-md w-full text-center">
            <h2 className="text-2xl font-semibold mb-4">Vous n'êtes pas connecté</h2>
            {/* Lien vers la page de connexion */}
            <Link 
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </main>
  )
} 