import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../utils/supabase/server'
import { SubmitButton } from './submit-button'

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

  const isSignUp = searchParams.signup === 'true'
  const redirectTo = searchParams.next || '/dashboard'

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                </svg>
                <span className="text-2xl font-bold ml-2 text-gray-900">LeadFinder</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold mt-8 mb-2 text-gray-900">
              {isSignUp ? 'Créer un compte' : 'Connexion'}
            </h1>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Créez votre compte pour commencer à prospecter efficacement' 
                : 'Connectez-vous pour accéder à votre tableau de bord'}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <form
              className="animate-fade-in"
              action={isSignUp ? '/auth/sign-up' : '/auth/sign-in'}
              method="post"
            >
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse email
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20"
                    name="email"
                    placeholder="vous@exemple.fr"
                    required
                  />
                </div>
                <div className="form-group">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    {!isSignUp && (
                      <Link href="/reset-password" className="text-sm text-primary hover:underline">
                        Mot de passe oublié ?
                      </Link>
                    )}
                  </div>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20"
                    type="password"
                    name="password"
                    placeholder={isSignUp ? 'Choisissez un mot de passe sécurisé' : 'Votre mot de passe'}
                    required
                  />
                </div>

                <input type="hidden" name="next" value={redirectTo} />

                {searchParams?.message && (
                  <div className="alert alert-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{searchParams.message}</span>
                  </div>
                )}

                <SubmitButton
                  className="btn btn-primary w-full py-3 mt-2"
                  pendingText={isSignUp ? "Création du compte..." : "Connexion en cours..."}
                >
                  {isSignUp ? "S'inscrire" : "Se connecter"}
                </SubmitButton>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? (
                  <>
                    Vous avez déjà un compte ?{' '}
                    <Link href={`/login?next=${redirectTo}`} className="text-primary font-medium hover:underline">
                      Connectez-vous
                    </Link>
                  </>
                ) : (
                  <>
                    Vous n'avez pas de compte ?{' '}
                    <Link href={`/login?signup=true&next=${redirectTo}`} className="text-primary font-medium hover:underline">
                      Inscrivez-vous
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              En vous connectant, vous acceptez nos{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Conditions d'utilisation
              </Link>{' '}
              et notre{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="flex flex-col justify-center p-12 max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-6">Trouvez vos clients idéaux avec LeadFinder</h2>
          <p className="text-lg mb-8 opacity-90">
            Notre plateforme vous aide à identifier et contacter les prospects les plus pertinents pour votre activité.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-1">Recherche avancée</h3>
                <p className="opacity-80">Trouvez rapidement les leads qui correspondent à vos critères</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-1">Profils personnalisés</h3>
                <p className="opacity-80">Créez des profils de prospection pour automatiser vos recherches</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-1">Suivi efficace</h3>
                <p className="opacity-80">Suivez vos leads à travers tout le cycle de vente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 