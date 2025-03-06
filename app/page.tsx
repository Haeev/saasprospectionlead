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
    <main>
      {/* Section héro */}
      <section className="bg-primary text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              LeadFinder SaaS
            </h1>
            <p className="text-xl mb-8">
              Plateforme de prospection et génération de leads qualifiés pour entrepreneurs et commerciaux.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login?signup=true" className="btn btn-lg btn-secondary">
                S'inscrire gratuitement
              </Link>
              <Link href="/login" className="btn btn-lg text-white border border-white">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section fonctionnalités */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fonctionnalités principales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Recherche avancée</h3>
                <p className="text-gray-600">
                  Trouvez vos clients idéaux grâce à notre moteur de recherche avancé et nos filtres personnalisés.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Profils de prospection</h3>
                <p className="text-gray-600">
                  Créez des profils de prospection pour cibler précisément votre audience et automatiser vos recherches.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Suivi des leads</h3>
                <p className="text-gray-600">
                  Gérez et suivez vos leads à travers tout le cycle de vente, de la découverte à la conversion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section avantages */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Pourquoi choisir LeadFinder ?
            </h2>
            <p className="text-xl text-gray-600">
              Notre plateforme vous offre tous les outils nécessaires pour optimiser votre prospection commerciale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sécurité des données</h3>
                <p className="text-gray-600">
                  Toutes vos données sont cryptées et sécurisées selon les normes les plus strictes.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Performance optimale</h3>
                <p className="text-gray-600">
                  Notre algorithme de recherche vous permet de trouver rapidement les leads les plus pertinents.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-yellow-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Gain de temps</h3>
                <p className="text-gray-600">
                  Automatisez vos tâches de prospection et concentrez-vous sur la conversion de vos leads.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Solution cloud</h3>
                <p className="text-gray-600">
                  Accédez à vos données depuis n'importe où, sur tous vos appareils.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à transformer votre prospection ?
            </h2>
            <p className="text-xl mb-8">
              Rejoignez des milliers d'entrepreneurs et commerciaux qui ont déjà optimisé leur processus de génération de leads.
            </p>
            <Link href="/login?signup=true" className="btn btn-lg btn-secondary">
              Commencer maintenant
            </Link>
            <p className="mt-6 text-sm">
              Déjà inscrit ? <Link href="/login" className="underline">Se connecter</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
} 