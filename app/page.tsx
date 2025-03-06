import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

/**
 * Composant de la page d'accueil
 * Redirige les utilisateurs connectés vers le tableau de bord
 * Affiche une page d'accueil simple pour les utilisateurs non connectés
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-6">
          LeadFinder SaaS
        </h1>
        
        <p className="text-xl mb-8">
          Plateforme de prospection et génération de leads qualifiés pour entrepreneurs et commerciaux.
        </p>
        
        <div className="flex gap-4">
          <Link 
            href="/login?signup=true"
            className="btn-primary"
          >
            S'inscrire
          </Link>
          
          <Link 
            href="/login"
            className="btn-secondary"
          >
            Se connecter
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recherche avancée</h2>
          <p>Trouvez vos clients idéaux grâce à notre moteur de recherche avancé et nos filtres personnalisés.</p>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Profils de prospection</h2>
          <p>Créez des profils de prospection pour cibler précisément votre audience et automatiser vos recherches.</p>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Suivi des leads</h2>
          <p>Gérez et suivez vos leads à travers tout le cycle de vente, de la découverte à la conversion.</p>
        </div>
      </div>
    </main>
  )
} 