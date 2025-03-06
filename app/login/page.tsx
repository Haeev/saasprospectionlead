'use client'

// Import des fonctions et hooks nécessaires
import { login, signup } from './actions'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
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
        <div className="rounded-xl bg-red-50 p-4 border border-red-100 animate-fade-in">
          <div className="flex">
            <div className="text-sm text-red-600">{error}</div>
          </div>
        </div>
      )}

      {/* Affichage des messages de succès */}
      {message && (
        <div className="rounded-xl bg-green-50 p-4 border border-green-100 animate-fade-in">
          <div className="flex">
            <div className="text-sm text-green-600">{message}</div>
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
  const searchParams = useSearchParams()
  const isSignup = searchParams.get('signup') === 'true'
  const [mode, setMode] = useState(isSignup ? 'signup' : 'login')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 px-4 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-100 rounded-full filter blur-3xl opacity-20 animate-float delay-200"></div>
        <div className="absolute top-1/4 left-1/4 w-full h-full dot-pattern opacity-30"></div>
      </div>
      
      {/* Logo et titre */}
      <div className="text-center mb-8 relative z-10 animate-fade-in">
        <Link href="/" className="inline-block">
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-2">
              L
            </div>
            <h1 className="text-3xl font-bold text-gradient">LeadFinder</h1>
          </div>
        </Link>
      </div>
      
      {/* Conteneur principal du formulaire */}
      <div className="w-full max-w-md space-y-6 glass-effect rounded-2xl p-8 relative z-10 animate-fade-in delay-100">
        {/* En-tête */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {mode === 'login' ? 'Connexion à votre compte' : 'Créer un compte'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'login' 
              ? 'Accédez à votre espace de prospection et de gestion de leads' 
              : 'Commencez à générer des leads qualifiés pour votre entreprise'}
          </p>
        </div>

        <div className="mt-6">
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
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200 sm:text-sm"
                  placeholder="votre@email.com"
                />
              </div>
              {/* Champ mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === 'login' ? "current-password" : "new-password"}
                  required
                  className="relative block w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Lien mot de passe oublié */}
            {mode === 'login' && (
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                    Mot de passe oublié?
                  </a>
                </div>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex flex-col space-y-4">
              {mode === 'login' ? (
                <>
                  {/* Bouton de connexion */}
                  <button
                    formAction={login}
                    className="btn-primary w-full py-3"
                  >
                    Se connecter
                  </button>
                  {/* Lien pour s'inscrire */}
                  <div className="text-center text-sm">
                    Pas encore de compte?{' '}
                    <button 
                      type="button" 
                      onClick={() => setMode('signup')}
                      className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                      S&apos;inscrire
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Bouton d'inscription */}
                  <button
                    formAction={signup}
                    className="btn-primary w-full py-3"
                  >
                    Créer un compte
                  </button>
                  {/* Lien pour se connecter */}
                  <div className="text-center text-sm">
                    Déjà un compte?{' '}
                    <button 
                      type="button" 
                      onClick={() => setMode('login')}
                      className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                      Se connecter
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
        
        {/* Pied de page */}
        <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-100">
          En continuant, vous acceptez nos{' '}
          <Link href="/conditions" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            Conditions d&apos;utilisation
          </Link>{' '}
          et notre{' '}
          <Link href="/confidentialite" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            Politique de confidentialité
          </Link>
        </div>
      </div>
      
      {/* Éléments flottants décoratifs */}
      <div className="absolute bottom-10 right-10 animate-float delay-300 hidden md:block">
        <div className="glass-effect rounded-xl p-3 flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Sécurisé</span>
        </div>
      </div>
    </div>
  )
} 