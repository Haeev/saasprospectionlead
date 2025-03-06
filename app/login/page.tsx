import Link from 'next/link'
import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/src/components/SubmitButton'

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string; next: string; signup: string }
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/dashboard')
  }

  const isSignUp = searchParams?.signup === 'true'
  const redirectTo = searchParams?.next || '/dashboard'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
      </div>
      
      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl mr-2">
              L
            </div>
            <span className="text-2xl font-bold gradient-text">LeadFinder</span>
          </Link>
          
          <h1 className="text-3xl font-bold">
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isSignUp 
              ? 'Créez un compte pour accéder à toutes les fonctionnalités' 
              : 'Connectez-vous pour accéder à votre compte'}
          </p>
        </div>

        <div className="glass-card p-8 rounded-xl">
          <form
            className="space-y-6"
            action="/auth/login"
            method="post"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full"
                placeholder="••••••••"
              />
            </div>

            <input type="hidden" name="next" value={redirectTo} />
            <input type="hidden" name="signup" value={isSignUp ? 'true' : 'false'} />

            <div>
              <SubmitButton
                formAction="/auth/login"
                className="btn-primary w-full"
                pendingText={isSignUp ? "Création du compte..." : "Connexion en cours..."}
              >
                {isSignUp ? 'S\'inscrire' : 'Se connecter'}
              </SubmitButton>
            </div>

            {searchParams?.message && (
              <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-700 text-center rounded-lg">
                {searchParams.message}
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            {isSignUp ? (
              <p className="text-gray-600">
                Déjà un compte?{' '}
                <Link href="/login" className="text-indigo-600 hover:underline font-medium">
                  Se connecter
                </Link>
              </p>
            ) : (
              <p className="text-gray-600">
                Pas encore de compte?{' '}
                <Link href="/login?signup=true" className="text-indigo-600 hover:underline font-medium">
                  S'inscrire
                </Link>
              </p>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              En continuant, vous acceptez nos{' '}
              <Link href="#" className="text-indigo-600 hover:underline">
                Conditions d'utilisation
              </Link>{' '}
              et notre{' '}
              <Link href="#" className="text-indigo-600 hover:underline">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 