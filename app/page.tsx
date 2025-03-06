import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

/**
 * Composant de la page d'accueil
 * Redirige les utilisateurs connectés vers le tableau de bord
 * Affiche une page d'accueil moderne pour les utilisateurs non connectés
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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
            Plateforme de prospection intelligente
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Trouvez vos <span className="gradient-text">leads qualifiés</span> en quelques clics
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            LeadFinder vous aide à identifier, contacter et convertir les prospects les plus pertinents pour votre entreprise.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/login?signup=true" className="btn-primary">
              Commencer gratuitement
            </Link>
            
            <Link href="/login" className="btn-secondary">
              Se connecter
            </Link>
          </div>
        </div>
        
        {/* Image ou illustration */}
        <div className="mt-16 relative w-full max-w-4xl">
          <div className="glass-card p-8 rounded-2xl">
            <div className="bg-indigo-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-xl font-semibold mb-2">Tableau de bord</h3>
                <p className="text-gray-600">Visualisez et gérez tous vos leads en un seul endroit</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">128</div>
                  <div className="text-sm text-gray-500">Nouveaux leads</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-1">64%</div>
                  <div className="text-sm text-gray-500">Taux de conversion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section-container bg-gray-50 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fonctionnalités principales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des outils puissants pour optimiser votre processus de prospection
          </p>
        </div>
        
        <div className="features-grid">
          <div className="card">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Recherche avancée</h3>
            <p className="text-gray-600">
              Trouvez vos clients idéaux grâce à notre moteur de recherche avancé et nos filtres personnalisés.
            </p>
          </div>
          
          <div className="card">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Profils de prospection</h3>
            <p className="text-gray-600">
              Créez des profils de prospection pour cibler précisément votre audience et automatiser vos recherches.
            </p>
          </div>
          
          <div className="card">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Suivi des leads</h3>
            <p className="text-gray-600">
              Gérez et suivez vos leads à travers tout le cycle de vente, de la découverte à la conversion.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-container text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer votre prospection ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez des milliers d'entrepreneurs et commerciaux qui ont déjà optimisé leur processus de génération de leads.
          </p>
          <Link href="/login?signup=true" className="btn-primary">
            Commencer maintenant
          </Link>
          <p className="mt-6 text-sm text-gray-500">
            Déjà inscrit ? <Link href="/login" className="text-indigo-600 hover:underline">Se connecter</Link>
          </p>
        </div>
      </section>
    </main>
  )
} 