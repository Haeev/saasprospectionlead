'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserProfile, getUserProspectionProfiles, getUserLeads, getUserSearchHistory } from '../../src/lib/supabase';
import StatCard from '../../src/components/StatCard';
import SimpleChart from '../../src/components/SimpleChart';

// Types pour les données du tableau de bord
interface DashboardData {
  user: any | null;
  profile: any | null;
  prospectionProfiles: any[];
  leads: any[];
  searchHistory: any[];
  isLoading: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    user: null,
    profile: null,
    prospectionProfiles: [],
    leads: [],
    searchHistory: [],
    isLoading: true
  });

  useEffect(() => {
    // Fonction pour charger les données du tableau de bord
    async function loadDashboardData() {
      try {
        // Récupération de l'utilisateur actuel
        const user = await getCurrentUser();
        
        if (!user) {
          // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
          router.push('/login');
          return;
        }

        // Récupération des données du tableau de bord
        const [profile, prospectionProfiles, leads, searchHistory] = await Promise.all([
          getUserProfile(user.id),
          getUserProspectionProfiles(user.id),
          getUserLeads(user.id),
          getUserSearchHistory(user.id)
        ]);

        // Mise à jour des données du tableau de bord
        setDashboardData({
          user,
          profile,
          prospectionProfiles,
          leads,
          searchHistory,
          isLoading: false
        });
      } catch (error) {
        console.error('Erreur lors du chargement des données du tableau de bord:', error);
        setDashboardData(prev => ({ ...prev, isLoading: false }));
      }
    }

    loadDashboardData();
  }, [router]);

  // Affichage d'un message de chargement pendant le chargement des données
  if (dashboardData.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement du tableau de bord...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Données pour les graphiques
  const leadsChartData = [4, 6, 8, 5, 10, 12, 8, 9, 11, 13, 15];
  const revenueChartData = [10, 15, 12, 18, 20, 22, 25, 23, 28, 30, 32];
  
  // Calculer le nombre de leads par statut
  const leadsByStatus = dashboardData.leads.reduce((acc: Record<string, number>, lead: any) => {
    const status = lead.status || 'nouveau';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bannière de bienvenue */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 rounded-xl p-6 mb-8 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bienvenue, {dashboardData.profile?.full_name || dashboardData.user?.email?.split('@')[0] || 'Utilisateur'}
            </h1>
            <p className="text-blue-100">
              Depuis le mois dernier, vos leads ont augmenté de 5%
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" />
              </svg>
              Date
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              Rapports
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              Fichiers
            </button>
          </div>
        </div>
      </div>
      
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Carte des leads */}
        <StatCard
          title="Leads"
          value={dashboardData.leads.length}
          subtitle="Total des leads"
          trend={{ value: 5, isPositive: true }}
          chart={<SimpleChart data={leadsChartData} color="#4f46e5" />}
          actions={
            <div className="flex justify-between">
              <button 
                onClick={() => router.push('/search')}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Rechercher des leads
              </button>
              <button 
                onClick={() => router.push('/leads')}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Voir tous les leads
              </button>
            </div>
          }
        />
        
        {/* Carte des profils */}
        <StatCard
          title="Profils de prospection"
          value={dashboardData.prospectionProfiles.length}
          subtitle="Profils actifs"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          }
          actions={
            <button 
              onClick={() => router.push('/profiles/new')}
              className="w-full text-center text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              Créer un nouveau profil
            </button>
          }
        />
        
        {/* Carte des revenus (simulée) */}
        <StatCard
          title="Revenus estimés"
          value="43K €"
          subtitle="Basé sur vos leads qualifiés"
          chart={<SimpleChart data={revenueChartData} color="#10b981" />}
          actions={
            <div className="flex justify-between">
              <button className="text-sm text-gray-600 dark:text-gray-300">Mensuel</button>
              <button className="text-sm text-gray-400 dark:text-gray-500">Annuel</button>
            </div>
          }
        />
      </div>
      
      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Carte des leads par statut */}
        <StatCard
          title="Leads par statut"
          value={dashboardData.leads.length}
          subtitle="Répartition des leads"
          className="lg:col-span-1"
          chart={
            <div className="space-y-4 mt-4">
              {Object.entries(leadsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    status === 'nouveau' ? 'bg-blue-500' :
                    status === 'contacté' ? 'bg-yellow-500' :
                    status === 'qualifié' ? 'bg-purple-500' :
                    status === 'proposition' ? 'bg-orange-500' :
                    status === 'gagné' ? 'bg-green-500' :
                    'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {status}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {count} ({Math.round((count / dashboardData.leads.length) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          status === 'nouveau' ? 'bg-blue-500' :
                          status === 'contacté' ? 'bg-yellow-500' :
                          status === 'qualifié' ? 'bg-purple-500' :
                          status === 'proposition' ? 'bg-orange-500' :
                          status === 'gagné' ? 'bg-green-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${(count / dashboardData.leads.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        />
        
        {/* Carte des recherches récentes */}
        <StatCard
          title="Recherches récentes"
          value={dashboardData.searchHistory.length}
          subtitle="Historique de recherche"
          className="lg:col-span-1"
          chart={
            <div className="space-y-2 mt-4">
              {dashboardData.searchHistory.slice(0, 5).map((search: any) => (
                <div key={search.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {search.search_name || `Recherche du ${new Date(search.created_at).toLocaleDateString()}`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {search.results_count} résultats
                      </p>
                    </div>
                    <button 
                      onClick={() => router.push(`/search?history=${search.id}`)}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      Relancer
                    </button>
                  </div>
                </div>
              ))}
              
              {dashboardData.searchHistory.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400">Aucune recherche récente</p>
                </div>
              )}
            </div>
          }
          actions={
            <button 
              onClick={() => router.push('/search')}
              className="w-full text-center text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              Nouvelle recherche
            </button>
          }
        />
      </div>
      
      {/* Derniers leads */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Derniers leads</h2>
            <button 
              onClick={() => router.push('/leads')}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              Voir tous
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Entreprise
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {dashboardData.leads.slice(0, 5).map((lead: any) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.company_name}</div>
                    {lead.industry && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">{lead.industry}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{lead.contact_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lead.status === 'nouveau' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      lead.status === 'contacté' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      lead.status === 'qualifié' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      lead.status === 'proposition' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      lead.status === 'gagné' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => router.push(`/leads/${lead.id}`)}
                      className="text-blue-600 dark:text-blue-400 hover:underline mr-3"
                    >
                      Détails
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              
              {dashboardData.leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Aucun lead trouvé. Commencez par rechercher des leads.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 