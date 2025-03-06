import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              LeadFinder
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Plateforme SaaS de prospection et génération de leads qualifiés pour entrepreneurs et commerciaux.
              Trouvez vos clients idéaux en quelques clics.
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Liens rapides
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/dashboard" className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Recherche
                </Link>
              </li>
              <li>
                <Link href="/profiles/new" className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Nouveau profil
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Légal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Légal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/rgpd" className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  RGPD
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {currentYear} LeadFinder SaaS. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
} 