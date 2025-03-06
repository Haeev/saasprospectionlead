'use client'

// Import des fonctions et hooks nécessaires
import { login, signup } from './actions'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

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
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      {/* Affichage des messages de succès */}
      {message && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="text-sm text-green-700">{message}</div>
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
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {/* Conteneur principal du formulaire */}
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        {/* En-tête */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h2>
        </div>

        {/* Messages d'erreur ou de succès avec Suspense boundary */}
        <Suspense fallback={<div>Chargement...</div>}>
          <Messages />
        </Suspense>

        {/* Formulaire de connexion/inscription */}
        <form className="mt-8 space-y-6">
          {/* Champs de saisie */}
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Champ email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Adresse email"
              />
            </div>
            {/* Champ mot de passe */}
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Mot de passe"
              />
            </div>
          </div>

          {/* Lien mot de passe oublié */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Mot de passe oublié?
              </a>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col space-y-4">
            {/* Bouton de connexion */}
            <button
              formAction={login}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
            {/* Bouton d'inscription */}
            <button
              formAction={signup}
              className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              S&apos;inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 