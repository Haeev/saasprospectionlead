'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserProfile, getUserProspectionProfiles, getUserLeads, getUserSearchHistory } from '../../src/lib/supabase';
import Link from 'next/link';

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
          <div className="loader mx-auto mb-4"></div>
          <h1 className="text-xl font-medium">Chargement du tableau de bord...</h1>
        </div>
      </div>
    );
  }

  // Calculer le nombre de leads par statut
  const leadsByStatus = dashboardData.leads.reduce((acc: Record<string, number>, lead: any) => {
    const status = lead.status || 'nouveau';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Statuts possibles pour les leads
  const statuses = ['nouveau', 'contacté', 'qualifié', 'proposition', 'gagné', 'perdu'];
  
  // Couleurs pour les statuts
  const statusColors: Record<string, string> = {
    nouveau: '#3b82f6',     // Bleu
    contacté: '#f59e0b',    // Orange
    qualifié: '#8b5cf6',    // Violet
    proposition: '#ec4899', // Rose
    gagné: '#10b981',       // Vert
    perdu: '#ef4444'        // Rouge
  };

  return (
    <div className="container py-8">
      {/* En-tête du tableau de bord */}
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">
            Bienvenue, {dashboardData.profile?.full_name || dashboardData.user?.email?.split('@')[0] || 'Utilisateur'}
          </h1>
          <p className="dashboard-subtitle">
            Depuis le mois dernier, vos leads ont augmenté de 5%
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Carte des leads */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium">Leads</h2>
          </div>
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold">{dashboardData.leads.length}</div>
                <div className="text-sm text-gray-500">Total des leads</div>
              </div>
              <div className="text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>5%</span>
              </div>
            </div>
            <div className="h-10 bg-gray-100 rounded-full overflow-hidden">
              <div className="flex h-full">
                {statuses.map(status => {
                  const count = leadsByStatus[status] || 0;
                  const percentage = dashboardData.leads.length ? (count / dashboardData.leads.length) * 100 : 0;
                  return percentage > 0 ? (
                    <div 
                      key={status}
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: statusColors[status] 
                      }}
                      title={`${status}: ${count} (${Math.round(percentage)}%)`}
                    />
                  ) : null;
                })}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="flex justify-between">
              <Link href="/search" className="text-primary text-sm font-medium">
                Rechercher
              </Link>
              <Link href="/leads" className="text-primary text-sm font-medium">
                Voir tous
              </Link>
            </div>
          </div>
        </div>
        
        {/* Carte des profils */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium">Profils de prospection</h2>
          </div>
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold">{dashboardData.prospectionProfiles.length}</div>
                <div className="text-sm text-gray-500">Profils actifs</div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              {dashboardData.prospectionProfiles.slice(0, 3).map((profile: any) => (
                <div key={profile.id} className="p-2 bg-gray-50 rounded flex justify-between items-center">
                  <span className="font-medium">{profile.name}</span>
                  {profile.is_default && <span className="badge badge-primary text-xs">Défaut</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <Link href="/profiles/new" className="btn btn-primary w-full text-center text-sm">
              Créer un nouveau profil
            </Link>
          </div>
        </div>
        
        {/* Carte des revenus (simulée) */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium">Revenus estimés</h2>
          </div>
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold">43K €</div>
                <div className="text-sm text-gray-500">Basé sur vos leads qualifiés</div>
              </div>
              <div className="text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>12%</span>
              </div>
            </div>
            <div className="h-20 flex items-end space-x-1">
              {[10, 15, 12, 18, 20, 22, 25, 23, 28, 30, 32].map((value, index) => (
                <div 
                  key={index}
                  className="bg-green-500 rounded-t"
                  style={{ 
                    height: `${(value / 32) * 100}%`,
                    width: `${100 / 11}%`
                  }}
                />
              ))}
            </div>
          </div>
          <div className="card-footer">
            <div className="flex justify-between">
              <button className="text-sm text-gray-600 font-medium">Mensuel</button>
              <button className="text-sm text-gray-400">Annuel</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Carte des leads par statut */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium">Leads par statut</h2>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {statuses.map(status => {
                const count = leadsByStatus[status] || 0;
                const percentage = dashboardData.leads.length ? (count / dashboardData.leads.length) * 100 : 0;
                return (
                  <div key={status} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: statusColors[status] }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: statusColors[status]
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Carte des recherches récentes */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium">Recherches récentes</h2>
          </div>
          <div className="card-body">
            {dashboardData.searchHistory.length > 0 ? (
              <div className="space-y-2">
                {dashboardData.searchHistory.slice(0, 5).map((search: any) => (
                  <div key={search.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {search.search_name || `Recherche du ${new Date(search.created_at).toLocaleDateString()}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {search.results_count} résultats
                        </p>
                      </div>
                      <Link href={`/search?id=${search.id}`} className="text-primary text-sm">
                        Voir
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                Aucune recherche récente
              </div>
            )}
          </div>
          <div className="card-footer">
            <Link href="/search" className="btn btn-primary w-full text-center text-sm">
              Nouvelle recherche
            </Link>
          </div>
        </div>
      </div>
      
      {/* Actions rapides */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium">Actions rapides</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/search" className="btn btn-secondary text-center">
              Rechercher des leads
            </Link>
            <Link href="/profiles/new" className="btn btn-secondary text-center">
              Créer un profil
            </Link>
            <Link href="/leads/import" className="btn btn-secondary text-center">
              Importer des leads
            </Link>
            <Link href="/leads/export" className="btn btn-secondary text-center">
              Exporter des leads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 