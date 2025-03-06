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
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isSignUp 
              ? 'Créez un compte pour accéder à toutes les fonctionnalités' 
              : 'Connectez-vous pour accéder à votre compte'}
          </p>
        </div>

        <div className="bg-white p-8 shadow-md rounded-lg">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <input type="hidden" name="next" value={redirectTo} />
            <input type="hidden" name="signup" value={isSignUp ? 'true' : 'false'} />

            <div>
              <SubmitButton
                formAction="/auth/login"
                className="w-full btn-primary"
                pendingText={isSignUp ? "Création du compte..." : "Connexion en cours..."}
              >
                {isSignUp ? 'S\'inscrire' : 'Se connecter'}
              </SubmitButton>
            </div>

            {searchParams?.message && (
              <p className="mt-4 p-4 bg-red-100 text-red-700 text-center rounded-md">
                {searchParams.message}
              </p>
            )}
          </form>

          <div className="mt-6 text-center">
            {isSignUp ? (
              <p>
                Déjà un compte?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Se connecter
                </Link>
              </p>
            ) : (
              <p>
                Pas encore de compte?{' '}
                <Link href="/login?signup=true" className="text-blue-600 hover:underline">
                  S'inscrire
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 