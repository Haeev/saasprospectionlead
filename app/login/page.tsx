'use client'

// Import des fonctions et hooks nécessaires
import { login, signup } from './actions'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

/**
 * Composant qui affiche les messages d'erreur ou de succès
 */
function Messages() {
  // Récupération des paramètres d'URL pour afficher les messages d'erreur ou de succès
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')

  return (
    <>
      {/* Affichage des messages d'erreur */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
          <div className="flex">
            <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
          </div>
        </div>
      )}

      {/* Affichage des messages de succès */}
      {message && (
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
          <div className="flex">
            <div className="text-sm text-green-700 dark:text-green-400">{message}</div>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * Composant de la page de connexion/inscription
 * Permet aux utilisateurs de se connecter ou de créer un compte
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 px-4">
      {/* Logo et titre */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-bold text-gradient">LeadFinder</h1>
        </Link>
      </div>
      
      {/* Conteneur principal du formulaire */}
      <div className="w-full max-w-md space-y-6 card">
        {/* En-tête */}
        <div className="card-header">
          <h2 className="text-2xl font-bold text-center">
            Connexion à votre compte
          </h2>
          <p className="mt-2 text-center text-sm">
            Accédez à votre espace de prospection et de gestion de leads
          </p>
        </div>

        <div className="card-body">
          {/* Messages d'erreur ou de succès avec Suspense boundary */}
          <Suspense fallback={<div className="text-center py-2">Chargement...</div>}>
            <Messages />
          </Suspense>

          {/* Formulaire de connexion/inscription */}
          <form className="mt-6 space-y-6">
            {/* Champs de saisie */}
            <div className="space-y-4">
              {/* Champ email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200 sm:text-sm"
                  placeholder="votre@email.com"
                />
              </div>
              {/* Champ mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Lien mot de passe oublié */}
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Mot de passe oublié?
                </a>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col space-y-4">
              {/* Bouton de connexion */}
              <button
                formAction={login}
                className="btn-primary w-full py-2"
              >
                Se connecter
              </button>
              {/* Bouton d'inscription */}
              <button
                formAction={signup}
                className="btn-secondary w-full py-2"
              >
                S&apos;inscrire
              </button>
            </div>
          </form>
        </div>
        
        {/* Pied de page */}
        <div className="card-footer text-center text-sm">
          En vous connectant, vous acceptez nos{' '}
          <Link href="/conditions" className="text-blue-600 dark:text-blue-400 hover:underline">
            Conditions d&apos;utilisation
          </Link>{' '}
          et notre{' '}
          <Link href="/confidentialite" className="text-blue-600 dark:text-blue-400 hover:underline">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </div>
  )
} 