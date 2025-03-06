import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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
    <main className="relative overflow-hidden">
      {/* Section héro */}
      <section className="section-container pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="badge mb-4 animate-fade-in">Résultats concrets</div>
        
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Sign, Seal, Deliver with <span className="text-gradient">LeadFinder</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in delay-100">
            Plateforme SaaS de prospection et génération de leads qualifiés pour entrepreneurs et commerciaux. Sécurisez vos données avec notre technologie avancée.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in delay-200">
            <Link 
              href="/login?signup=true"
              className="btn-primary"
            >
              Protéger vos données maintenant
            </Link>
            
            <Link 
              href="/login"
              className="btn-secondary"
            >
              Se connecter
            </Link>
          </div>
        </div>
        
        {/* Illustration flottante */}
        <div className="absolute top-20 right-0 w-1/2 h-full pointer-events-none hidden lg:block">
          <div className="relative w-full h-full">
            {/* Élément E-Signature */}
            <div className="absolute top-10 right-40 animate-float">
              <div className="glass-effect rounded-xl p-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">E-Signature</span>
              </div>
            </div>
            
            {/* Élément Factures */}
            <div className="absolute top-40 right-10 animate-float delay-200">
              <div className="glass-effect rounded-xl p-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Factures</span>
              </div>
            </div>
            
            {/* Élément central */}
            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 animate-pulse-slow">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 filter blur-xl opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              </div>
            </div>
            
            {/* Élément E-Forms */}
            <div className="absolute bottom-40 right-20 animate-float delay-300">
              <div className="glass-effect rounded-xl p-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">E-Forms</span>
              </div>
            </div>
            
            {/* Élément E-Receipts */}
            <div className="absolute bottom-20 right-60 animate-float">
              <div className="glass-effect rounded-xl p-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">E-Receipts</span>
              </div>
            </div>
            
            {/* Avatars */}
            <div className="absolute top-1/4 left-1/4 animate-float delay-100">
              <div className="w-10 h-10 rounded-full bg-white shadow-md overflow-hidden">
                <div className="w-full h-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-medium">
                  A
                </div>
              </div>
            </div>
            
            <div className="absolute top-2/3 left-1/3 animate-float delay-200">
              <div className="w-10 h-10 rounded-full bg-white shadow-md overflow-hidden">
                <div className="w-full h-full bg-purple-200 flex items-center justify-center text-purple-600 font-medium">
                  B
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section fonctionnalités */}
      <section className="section-container py-16 md:py-24 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fonctionnalités principales</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Notre plateforme offre des outils puissants pour optimiser votre processus de prospection et de génération de leads.
          </p>
        </div>
        
        <div className="features-grid">
          <div className="card card-hover animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Recherche avancée</h3>
            <p className="text-gray-700">
              Trouvez vos clients idéaux grâce à notre moteur de recherche avancé et nos filtres personnalisés.
            </p>
          </div>
          
          <div className="card card-hover animate-fade-in delay-100">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Profils de prospection</h3>
            <p className="text-gray-700">
              Créez des profils de prospection pour cibler précisément votre audience et automatiser vos recherches.
            </p>
          </div>
          
          <div className="card card-hover animate-fade-in delay-200">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Suivi des leads</h3>
            <p className="text-gray-700">
              Gérez et suivez vos leads à travers tout le cycle de vente, de la découverte à la conversion.
            </p>
          </div>
        </div>
      </section>
      
      {/* Section Track & Nudge */}
      <section className="section-container py-16 md:py-24 relative">
        <div className="badge mb-4">Fonctionnalités</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Track Nudge & Sign</h2>
            <p className="text-lg text-gray-700 mb-6">
              Fonctionnalité de suivi intégrée, offrant une vue d'ensemble de la chronologie des documents. Aide à suivre les signatures manquantes et vous permet de relancer les clients.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <span>Suivi en temps réel des signatures</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <span>Notifications automatiques</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <span>Relances personnalisées</span>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="glass-effect rounded-xl p-6 animate-fade-in">
              <div className="mb-4">
                <div className="badge">Sign Approval Required</div>
              </div>
              
              <div className="text-sm mb-4">
                <p>Hi Katherine,</p>
                <p className="mt-2">Sarah Blanche has sent you a new document to review and sign. Click on the document thumbnail below to sign</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-6 border-t pt-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-purple-600">SB</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Sarah Blanche</div>
                  <div className="text-xs text-gray-500">sarahblanch21@signvault.com</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 animate-float delay-100">
              <div className="glass-effect rounded-xl p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section CTA */}
      <section className="section-container py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer votre prospection ?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Rejoignez des milliers d'entrepreneurs et commerciaux qui ont déjà optimisé leur processus de génération de leads.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/login?signup=true"
              className="btn-primary"
            >
              Commencer maintenant
            </Link>
            
            <Link 
              href="/contact"
              className="btn-secondary"
            >
              Nous contacter
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            Déjà inscrit ? <Link href="/login" className="text-indigo-600 hover:underline">Se connecter</Link>
          </p>
        </div>
      </section>
    </main>
  )
} 