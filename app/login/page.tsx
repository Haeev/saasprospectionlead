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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
              L
            </div>
            <span className="ml-2 text-2xl font-bold">LeadFinder</span>
          </Link>
          
          <h1 className="text-2xl font-bold">
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isSignUp 
              ? 'Créez un compte pour accéder à toutes les fonctionnalités' 
              : 'Connectez-vous pour accéder à votre compte'}
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            {searchParams?.message && (
              <div className="alert alert-danger mb-6">
                {searchParams.message}
              </div>
            )}
            
            <form
              className="space-y-6"
              action="/auth/login"
              method="post"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>

              <input type="hidden" name="next" value={redirectTo} />
              <input type="hidden" name="signup" value={isSignUp ? 'true' : 'false'} />

              <div>
                <SubmitButton
                  formAction="/auth/login"
                  className="btn btn-primary w-full"
                  pendingText={isSignUp ? "Création du compte..." : "Connexion en cours..."}
                >
                  {isSignUp ? 'S\'inscrire' : 'Se connecter'}
                </SubmitButton>
              </div>
            </form>

            <div className="mt-6 text-center">
              {isSignUp ? (
                <p className="text-gray-600">
                  Déjà un compte?{' '}
                  <Link href="/login" className="text-primary font-medium">
                    Se connecter
                  </Link>
                </p>
              ) : (
                <p className="text-gray-600">
                  Pas encore de compte?{' '}
                  <Link href="/login?signup=true" className="text-primary font-medium">
                    S'inscrire
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          En continuant, vous acceptez nos{' '}
          <Link href="#" className="text-primary">
            Conditions d'utilisation
          </Link>{' '}
          et notre{' '}
          <Link href="#" className="text-primary">
            Politique de confidentialité
          </Link>
        </p>
      </div>
    </div>
  )
} 