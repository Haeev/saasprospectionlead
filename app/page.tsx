import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

/**
 * Composant de la page d'accueil
 * Redirige les utilisateurs connectés vers le tableau de bord
 * Affiche une page d'accueil attrayante pour les utilisateurs non connectés
 */
export default async function Home() {
  // Création du client Supabase
  const supabase = await createClient()
  // Récupération des informations de l'utilisateur connecté
  const { data: { user } } = await supabase.auth.getUser()

  // Rediriger les utilisateurs connectés vers le tableau de bord
  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        {/* En-tête avec logo et titre */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">LeadFinder</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Plateforme SaaS de prospection et génération de leads qualifiés pour entrepreneurs et commerciaux.
          </p>
        </div>
        
        {/* Cartes de fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <div className="card-header">
              <h3 className="text-xl font-semibold">Recherche avancée</h3>
            </div>
            <div className="card-body">
              <p>Trouvez vos clients idéaux grâce à notre moteur de recherche avancé et nos filtres personnalisés.</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h3 className="text-xl font-semibold">Profils de prospection</h3>
            </div>
            <div className="card-body">
              <p>Créez des profils de prospection pour cibler précisément votre audience et automatiser vos recherches.</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h3 className="text-xl font-semibold">Suivi des leads</h3>
            </div>
            <div className="card-body">
              <p>Gérez et suivez vos leads à travers tout le cycle de vente, de la découverte à la conversion.</p>
            </div>
          </div>
        </div>
        
        {/* Appel à l'action */}
        <div className="text-center">
          <Link 
            href="/login"
            className="btn-primary inline-block text-lg px-8 py-3 rounded-lg"
          >
            Commencer maintenant
          </Link>
          <p className="mt-4 text-sm">
            Déjà inscrit ? <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </main>
  )
} 