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
      {/* Section héro avec fond dégradé */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Trouvez vos clients idéaux avec <span className="text-secondary">LeadFinder</span>
            </h1>
            <p className="text-xl mb-10 opacity-90">
              La plateforme intelligente de prospection qui génère des leads qualifiés pour entrepreneurs et commerciaux.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login?signup=true" className="btn btn-lg btn-secondary">
                <span>Démarrer gratuitement</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/login" className="btn btn-lg btn-outline text-white border-white hover:bg-white/10">
                Se connecter
              </Link>
            </div>
            <div className="mt-12 text-sm text-white/70">
              <p>Déjà utilisé par plus de 500 entreprises</p>
              <div className="flex justify-center items-center gap-8 mt-4">
                {/* Logos des entreprises (placeholders) */}
                <div className="h-8 opacity-70">Company 1</div>
                <div className="h-8 opacity-70">Company 2</div>
                <div className="h-8 opacity-70">Company 3</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section fonctionnalités avec cartes modernes */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Fonctionnalités principales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des outils puissants pour optimiser votre processus de prospection et maximiser vos conversions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Recherche avancée</h3>
                <p className="text-gray-600 text-center">
                  Notre moteur de recherche intelligent utilise l'IA pour identifier les prospects les plus pertinents pour votre activité.
                </p>
                <div className="mt-6 text-center">
                  <Link href="/login?signup=true" className="text-primary font-medium hover:underline inline-flex items-center">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Profils de prospection</h3>
                <p className="text-gray-600 text-center">
                  Créez des profils personnalisés pour cibler précisément votre audience idéale et automatiser vos recherches.
                </p>
                <div className="mt-6 text-center">
                  <Link href="/login?signup=true" className="text-primary font-medium hover:underline inline-flex items-center">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Suivi des leads</h3>
                <p className="text-gray-600 text-center">
                  Suivez et gérez vos leads à travers tout le cycle de vente avec des outils d'analyse et de reporting avancés.
                </p>
                <div className="mt-6 text-center">
                  <Link href="/login?signup=true" className="text-primary font-medium hover:underline inline-flex items-center">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section statistiques */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Des résultats prouvés
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nos clients constatent une amélioration significative de leurs performances commerciales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">+45%</div>
              <p className="text-gray-600">Augmentation du taux de conversion</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">-30%</div>
              <p className="text-gray-600">Réduction du temps de prospection</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">+60%</div>
              <p className="text-gray-600">Augmentation du ROI commercial</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section témoignages */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Ce que nos clients disent
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez comment LeadFinder a transformé leur approche de prospection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Sophie Martin</h4>
                  <p className="text-sm text-gray-600">Directrice commerciale, TechSolutions</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Grâce à LeadFinder, nous avons pu identifier des prospects de qualité que nous n'aurions jamais trouvés autrement. Notre pipeline commercial s'est considérablement amélioré."
              </p>
            </div>
            
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Thomas Dubois</h4>
                  <p className="text-sm text-gray-600">Entrepreneur, GrowthLab</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "LeadFinder a révolutionné notre approche de la prospection. L'outil est intuitif et les résultats sont impressionnants. Je le recommande à tous les entrepreneurs."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à transformer votre prospection ?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Rejoignez des milliers d'entrepreneurs et commerciaux qui ont déjà optimisé leur processus de génération de leads.
            </p>
            <Link href="/login?signup=true" className="btn btn-lg btn-secondary">
              <span>Commencer maintenant</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="mt-6 text-sm opacity-90">
              Essai gratuit de 14 jours. Aucune carte de crédit requise.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LeadFinder</h3>
              <p className="text-gray-400">
                La plateforme de prospection intelligente pour les professionnels ambitieux.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Produit</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Fonctionnalités</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Tarifs</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Témoignages</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Guide d'utilisation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Webinaires</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Conditions d'utilisation</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Politique de confidentialité</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">RGPD</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 LeadFinder. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  )
} 