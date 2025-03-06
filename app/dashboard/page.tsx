'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserProfile, getUserProspectionProfiles, getUserLeads } from '../../src/lib/supabase';

// Types pour les données du tableau de bord
interface DashboardData {
  user: any | null;
  profile: any | null;
  prospectionProfiles: any[];
  leads: any[];
  isLoading: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    user: null,
    profile: null,
    prospectionProfiles: [],
    leads: [],
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
        const [profile, prospectionProfiles, leads] = await Promise.all([
          getUserProfile(user.id),
          getUserProspectionProfiles(user.id),
          getUserLeads(user.id)
        ]);

        // Mise à jour des données du tableau de bord
        setDashboardData({
          user,
          profile,
          prospectionProfiles,
          leads,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      
      {/* Section de bienvenue */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Bienvenue, {dashboardData.profile?.full_name || dashboardData.user?.email}
        </h2>
        <p className="text-gray-600">
          Voici un aperçu de votre activité de prospection.
        </p>
      </div>
      
      {/* Section des statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Profils de prospection</h3>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.prospectionProfiles.length}</p>
          <p className="text-gray-600 mt-2">Profils créés</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Leads</h3>
          <p className="text-3xl font-bold text-green-600">{dashboardData.leads.length}</p>
          <p className="text-gray-600 mt-2">Leads trouvés</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Taux de conversion</h3>
          <p className="text-3xl font-bold text-purple-600">0%</p>
          <p className="text-gray-600 mt-2">En attente de données</p>
        </div>
      </div>
      
      {/* Section des actions rapides */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => router.push('/profiles/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors"
          >
            Créer un profil
          </button>
          
          <button 
            onClick={() => router.push('/search')}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-colors"
          >
            Rechercher des leads
          </button>
          
          <button 
            onClick={() => router.push('/leads')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md transition-colors"
          >
            Gérer mes leads
          </button>
          
          <button 
            onClick={() => router.push('/settings')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-md transition-colors"
          >
            Paramètres
          </button>
        </div>
      </div>
      
      {/* Section des profils de prospection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Mes profils de prospection</h2>
          <button 
            onClick={() => router.push('/profiles/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
          >
            Nouveau profil
          </button>
        </div>
        
        {dashboardData.prospectionProfiles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Vous n'avez pas encore créé de profil de prospection.</p>
            <button 
              onClick={() => router.push('/profiles/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Créer mon premier profil
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Secteurs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Par défaut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.prospectionProfiles.map((profile) => (
                  <tr key={profile.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{profile.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{profile.industry?.join(', ') || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{profile.location?.join(', ') || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {profile.is_default ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Oui
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Non
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => router.push(`/profiles/${profile.id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => router.push(`/search?profile=${profile.id}`)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Rechercher
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Section des leads récents */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Mes leads récents</h2>
          <button 
            onClick={() => router.push('/leads')}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
          >
            Voir tous les leads
          </button>
        </div>
        
        {dashboardData.leads.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Vous n'avez pas encore de leads.</p>
            <button 
              onClick={() => router.push('/search')}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Rechercher des leads
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.company_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.contact_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        lead.status === 'nouveau' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'contacté' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'qualifié' ? 'bg-purple-100 text-purple-800' :
                        lead.status === 'proposition' ? 'bg-orange-100 text-orange-800' :
                        lead.status === 'gagné' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => router.push(`/leads/${lead.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 