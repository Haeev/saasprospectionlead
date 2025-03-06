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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="loader mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Chargement du tableau de bord</h1>
          <p className="text-gray-600">Veuillez patienter pendant que nous récupérons vos données...</p>
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
    nouveau: '#4361ee',     // Bleu
    contacté: '#f8961e',    // Orange
    qualifié: '#b5179e',    // Violet
    proposition: '#f72585', // Rose
    gagné: '#4cc9f0',       // Vert-bleu
    perdu: '#f94144'        // Rouge
  };

  // Données pour le graphique (simulées)
  const chartData = [10, 15, 12, 18, 20, 22, 25, 23, 28, 30, 32];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* En-tête du tableau de bord */}
      <div className="dashboard-header mb-8">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="dashboard-title">
                Bienvenue, {dashboardData.profile?.full_name || dashboardData.user?.email?.split('@')[0] || 'Utilisateur'}
              </h1>
              <p className="dashboard-subtitle">
                Depuis le mois dernier, vos leads ont augmenté de 5%
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link href="/search" className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Rechercher
              </Link>
              <Link href="/profiles/new" className="btn btn-outline text-white border-white hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nouveau profil
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Carte des leads */}
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 className="text-lg font-bold">Leads</h2>
              <span className="badge badge-primary">+5%</span>
            </div>
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-4xl font-bold">{dashboardData.leads.length}</div>
                  <div className="text-sm text-gray-500">Total des leads</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
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
              <div className="grid grid-cols-3 gap-2 text-xs">
                {statuses.slice(0, 3).map(status => (
                  <div key={status} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: statusColors[status] }}></div>
                    <span className="capitalize">{status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <div className="flex justify-between">
                <Link href="/search" className="text-primary text-sm font-medium hover:underline flex items-center">
                  <span>Rechercher</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/leads" className="text-primary text-sm font-medium hover:underline flex items-center">
                  <span>Voir tous</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Carte des profils */}
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 className="text-lg font-bold">Profils de prospection</h2>
              <span className="badge badge-secondary">{dashboardData.prospectionProfiles.length}</span>
            </div>
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-4xl font-bold">{dashboardData.prospectionProfiles.length}</div>
                  <div className="text-sm text-gray-500">Profils actifs</div>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3">
                {dashboardData.prospectionProfiles.slice(0, 3).map((profile: any) => (
                  <div key={profile.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-medium">{profile.name}</span>
                    </div>
                    {profile.is_default && <span className="badge badge-secondary text-xs">Défaut</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <Link href="/profiles/new" className="btn btn-primary w-full text-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Créer un nouveau profil
              </Link>
            </div>
          </div>
          
          {/* Carte des revenus (simulée) */}
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 className="text-lg font-bold">Revenus estimés</h2>
              <span className="badge badge-success">+12%</span>
            </div>
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-4xl font-bold">43K €</div>
                  <div className="text-sm text-gray-500">Basé sur vos leads qualifiés</div>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="h-24 flex items-end space-x-1">
                {chartData.map((value, index) => (
                  <div 
                    key={index}
                    className="bg-success rounded-t"
                    style={{ 
                      height: `${(value / Math.max(...chartData)) * 100}%`,
                      width: `${100 / chartData.length}%`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="card-footer">
              <div className="flex justify-between">
                <button className="text-sm font-medium text-gray-800 px-3 py-1 bg-gray-100 rounded-full">Mensuel</button>
                <button className="text-sm text-gray-500 px-3 py-1 hover:bg-gray-100 rounded-full">Annuel</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Carte des leads par statut */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-bold">Leads par statut</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {statuses.map(status => {
                  const count = leadsByStatus[status] || 0;
                  const percentage = dashboardData.leads.length ? (count / dashboardData.leads.length) * 100 : 0;
                  return (
                    <div key={status} className="flex items-center">
                      <div className="w-24 flex-shrink-0">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: statusColors[status] }}></div>
                          <span className="text-sm font-medium capitalize">{status}</span>
                        </div>
                      </div>
                      <div className="flex-grow mx-4">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${percentage}%`, 
                              backgroundColor: statusColors[status] 
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-16 text-right">
                        <span className="text-sm font-medium">{count}</span>
                        <span className="text-xs text-gray-500 ml-1">({Math.round(percentage)}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card-footer">
              <Link href="/leads" className="btn btn-outline w-full text-center text-sm">
                Voir tous les leads
              </Link>
            </div>
          </div>
          
          {/* Carte des activités récentes */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-bold">Activités récentes</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {dashboardData.searchHistory.length > 0 ? (
                  dashboardData.searchHistory.slice(0, 5).map((activity: any, index: number) => (
                    <div key={index} className="flex">
                      <div className="w-10 flex-shrink-0">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Recherche effectuée</p>
                        <p className="text-xs text-gray-500">{activity.query || 'Recherche sans critères'}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(activity.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">Aucune activité récente</p>
                    <Link href="/search" className="btn btn-primary btn-sm mt-4">
                      Faire une recherche
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer">
              <Link href="/history" className="btn btn-outline w-full text-center text-sm">
                Voir l'historique complet
              </Link>
            </div>
          </div>
        </div>
        
        {/* Section des actions rapides */}
        <div className="card mb-8">
          <div className="card-header">
            <h2 className="text-lg font-bold">Actions rapides</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link href="/search" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Rechercher</h3>
                <p className="text-xs text-gray-500">Trouver de nouveaux leads</p>
              </Link>
              
              <Link href="/profiles/new" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Nouveau profil</h3>
                <p className="text-xs text-gray-500">Créer un profil de prospection</p>
              </Link>
              
              <Link href="/leads/import" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-success mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Importer</h3>
                <p className="text-xs text-gray-500">Importer des leads</p>
              </Link>
              
              <Link href="/reports" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center text-warning mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Rapports</h3>
                <p className="text-xs text-gray-500">Analyser les performances</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 