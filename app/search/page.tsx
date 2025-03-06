'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../src/lib/supabase';

// Types pour les résultats de recherche
interface SearchResult {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  industry: string | null;
  company_size: string | null;
  annual_revenue: string | null;
  status: string;
  address?: string;
  notes?: string;
}

// Types pour les filtres de recherche
interface SearchFilters {
  industry: string[];
  company_size: string[];
  location: string[];
  min_annual_revenue: number | null;
  max_annual_revenue: number | null;
  has_website: boolean | null;
  keywords: string[];
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const profileId = searchParams.get('profile');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(profileId);
  const [filters, setFilters] = useState<SearchFilters>({
    industry: [],
    company_size: [],
    location: [],
    min_annual_revenue: null,
    max_annual_revenue: null,
    has_website: null,
    keywords: []
  });
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  // Options pour les secteurs d'activité
  const industryOptions = [
    'Technologie',
    'Finance',
    'Santé',
    'Éducation',
    'Commerce de détail',
    'Industrie',
    'Services',
    'Immobilier',
    'Transport',
    'Énergie'
  ];

  // Options pour les tailles d'entreprise
  const companySizeOptions = [
    'TPE (1-9 employés)',
    'PME (10-249 employés)',
    'ETI (250-4999 employés)',
    'GE (5000+ employés)'
  ];
  
  // Chargement des profils de l'utilisateur
  useEffect(() => {
    async function loadProfiles() {
      try {
        // Récupération de l'utilisateur actuel
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }
        
        // Récupération des profils de l'utilisateur
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setProfiles(data || []);
        
        // Si un profil est spécifié dans l'URL et qu'il appartient à l'utilisateur
        if (profileId && data?.some(profile => profile.id === profileId)) {
          setSelectedProfile(profileId);
          
          // Récupération des filtres du profil sélectionné
          const selectedProfileData = data.find(profile => profile.id === profileId);
          if (selectedProfileData) {
            setFilters({
              industry: selectedProfileData.industry || [],
              company_size: selectedProfileData.company_size || [],
              location: selectedProfileData.location || [],
              min_annual_revenue: selectedProfileData.min_annual_revenue,
              max_annual_revenue: selectedProfileData.max_annual_revenue,
              has_website: selectedProfileData.has_website,
              keywords: selectedProfileData.keywords || []
            });
          }
        } else if (data && data.length > 0) {
          // Sélection du profil par défaut ou du premier profil
          const defaultProfile = data.find(profile => profile.is_default) || data[0];
          setSelectedProfile(defaultProfile.id);
          
          // Récupération des filtres du profil par défaut
          setFilters({
            industry: defaultProfile.industry || [],
            company_size: defaultProfile.company_size || [],
            location: defaultProfile.location || [],
            min_annual_revenue: defaultProfile.min_annual_revenue,
            max_annual_revenue: defaultProfile.max_annual_revenue,
            has_website: defaultProfile.has_website,
            keywords: defaultProfile.keywords || []
          });
        }
        
        setIsLoading(false);
      } catch (error: any) {
        console.error('Erreur lors du chargement des profils:', error);
        setError(error.message || 'Une erreur est survenue lors du chargement des profils.');
        setIsLoading(false);
      }
    }
    
    loadProfiles();
  }, [router, profileId]);
  
  // Fonction pour gérer le changement de profil
  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProfileId = e.target.value;
    setSelectedProfile(newProfileId);
    
    // Mise à jour des filtres en fonction du profil sélectionné
    const selectedProfileData = profiles.find(profile => profile.id === newProfileId);
    if (selectedProfileData) {
      setFilters({
        industry: selectedProfileData.industry || [],
        company_size: selectedProfileData.company_size || [],
        location: selectedProfileData.location || [],
        min_annual_revenue: selectedProfileData.min_annual_revenue,
        max_annual_revenue: selectedProfileData.max_annual_revenue,
        has_website: selectedProfileData.has_website,
        keywords: selectedProfileData.keywords || []
      });
    }
  };
  
  // Fonction pour gérer les changements dans les filtres
  const handleFilterChange = (name: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Fonction pour gérer les changements dans les filtres à sélection multiple
  const handleMultiSelectChange = (name: keyof SearchFilters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[name] as string[];
      
      // Si la valeur est déjà sélectionnée, la retirer
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter(v => v !== value)
        };
      }
      
      // Sinon, l'ajouter
      return {
        ...prev,
        [name]: [...currentValues, value]
      };
    });
  };
  
  // Fonction pour effectuer la recherche
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Récupération de l'utilisateur actuel
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      // Construction de la requête de recherche
      let query = supabase
        .from('leads')
        .select('*');
      
      // Filtrage par secteur d'activité
      if (filters.industry.length > 0) {
        query = query.in('industry', filters.industry);
      }
      
      // Filtrage par taille d'entreprise
      if (filters.company_size.length > 0) {
        query = query.in('company_size', filters.company_size);
      }
      
      // Filtrage par chiffre d'affaires minimum
      if (filters.min_annual_revenue !== null) {
        query = query.gte('annual_revenue', filters.min_annual_revenue.toString());
      }
      
      // Filtrage par chiffre d'affaires maximum
      if (filters.max_annual_revenue !== null) {
        query = query.lte('annual_revenue', filters.max_annual_revenue.toString());
      }
      
      // Filtrage par présence d'un site web
      if (filters.has_website === true) {
        query = query.not('website', 'is', null);
      }
      
      // Exécution de la requête
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Filtrage supplémentaire côté client pour les critères plus complexes
      let filteredResults = data || [];
      
      // Filtrage par mots-clés
      if (filters.keywords.length > 0) {
        filteredResults = filteredResults.filter(lead => {
          const leadText = `${lead.company_name} ${lead.contact_name} ${lead.industry || ''} ${lead.notes || ''}`.toLowerCase();
          return filters.keywords.some(keyword => leadText.includes(keyword.toLowerCase()));
        });
      }
      
      // Filtrage par localisation
      if (filters.location.length > 0) {
        filteredResults = filteredResults.filter(lead => {
          // Utilisation d'une chaîne vide comme fallback si le champ address n'existe pas
          const leadLocation = lead.company_name + ' ' + (lead.notes || '');
          return filters.location.some(location => leadLocation.toLowerCase().includes(location.toLowerCase()));
        });
      }
      
      setResults(filteredResults);
      setSearchPerformed(true);
      
      // Enregistrement de la recherche dans l'historique
      if (selectedProfile) {
        await supabase
          .from('search_history')
          .insert({
            user_id: user.id,
            profile_id: selectedProfile,
            search_params: JSON.stringify(filters),
            results_count: filteredResults.length
          });
      }
    } catch (error: any) {
      console.error('Erreur lors de la recherche:', error);
      setError(error.message || 'Une erreur est survenue lors de la recherche.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour exporter les résultats au format CSV
  const handleExport = () => {
    if (results.length === 0) return;
    
    // Création des en-têtes CSV
    const headers = ['Entreprise', 'Contact', 'Email', 'Téléphone', 'Site Web', 'Secteur', 'Taille', 'CA Annuel', 'Statut'];
    
    // Création des lignes CSV
    const rows = results.map(result => [
      result.company_name,
      result.contact_name,
      result.email,
      result.phone || '',
      result.website || '',
      result.industry || '',
      result.company_size || '',
      result.annual_revenue || '',
      result.status
    ]);
    
    // Création du contenu CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Création d'un blob et d'un lien de téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Affichage d'un message de chargement pendant le chargement des données
  if (isLoading && !searchPerformed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement de la page de recherche...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recherche de leads</h1>
      
      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panneau de filtres */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Filtres de recherche</h2>
            
            {/* Sélection du profil */}
            <div className="mb-4">
              <label htmlFor="profile" className="block text-gray-700 font-medium mb-2">
                Profil de prospection
              </label>
              <select
                id="profile"
                value={selectedProfile || ''}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un profil</option>
                {profiles.map(profile => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name} {profile.is_default ? '(Défaut)' : ''}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Sélectionnez un profil pour charger ses filtres
              </p>
            </div>
            
            {/* Secteurs d'activité */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Secteurs d'activité
              </label>
              <div className="max-h-40 overflow-y-auto">
                {industryOptions.map(industry => (
                  <label key={industry} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={filters.industry.includes(industry)}
                      onChange={() => handleMultiSelectChange('industry', industry)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">{industry}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Taille d'entreprise */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Taille d'entreprise
              </label>
              <div>
                {companySizeOptions.map(size => (
                  <label key={size} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={filters.company_size.includes(size)}
                      onChange={() => handleMultiSelectChange('company_size', size)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">{size}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Chiffre d'affaires */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Chiffre d'affaires annuel (€)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.min_annual_revenue || ''}
                    onChange={(e) => handleFilterChange('min_annual_revenue', e.target.value === '' ? null : Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.max_annual_revenue || ''}
                    onChange={(e) => handleFilterChange('max_annual_revenue', e.target.value === '' ? null : Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Présence web */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.has_website === true}
                  onChange={(e) => handleFilterChange('has_website', e.target.checked ? true : null)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">A un site web</span>
              </label>
            </div>
            
            {/* Mots-clés */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Mots-clés (séparés par des virgules)
              </label>
              <input
                type="text"
                value={filters.keywords.join(', ')}
                onChange={(e) => {
                  const keywords = e.target.value.split(',').map(k => k.trim()).filter(k => k !== '');
                  handleFilterChange('keywords', keywords);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: innovation, digital"
              />
            </div>
            
            {/* Bouton de recherche */}
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              {isLoading ? 'Recherche en cours...' : 'Rechercher'}
            </button>
          </div>
          
          {/* Bouton pour créer un nouveau profil */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Profils</h2>
            <button
              onClick={() => router.push('/profiles/new')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Créer un nouveau profil
            </button>
          </div>
        </div>
        
        {/* Résultats de recherche */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Résultats de recherche</h2>
              
              {/* Bouton d'exportation */}
              {results.length > 0 && (
                <button
                  onClick={handleExport}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                >
                  Exporter en CSV
                </button>
              )}
            </div>
            
            {/* Message si aucune recherche n'a été effectuée */}
            {!searchPerformed && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Utilisez les filtres à gauche pour rechercher des leads.</p>
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Rechercher avec les filtres actuels
                </button>
              </div>
            )}
            
            {/* Message si aucun résultat n'a été trouvé */}
            {searchPerformed && results.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun résultat trouvé pour ces critères de recherche.</p>
              </div>
            )}
            
            {/* Tableau des résultats */}
            {searchPerformed && results.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Secteur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.map(result => (
                      <tr key={result.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{result.company_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{result.contact_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{result.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{result.industry || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            result.status === 'nouveau' ? 'bg-blue-100 text-blue-800' :
                            result.status === 'contacté' ? 'bg-yellow-100 text-yellow-800' :
                            result.status === 'qualifié' ? 'bg-purple-100 text-purple-800' :
                            result.status === 'proposition' ? 'bg-orange-100 text-orange-800' :
                            result.status === 'gagné' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => router.push(`/leads/${result.id}`)}
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
            
            {/* Pagination (à implémenter) */}
            {searchPerformed && results.length > 0 && (
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Affichage de {results.length} résultat{results.length > 1 ? 's' : ''}
                </p>
                <div className="flex space-x-2">
                  <button
                    disabled
                    className="px-3 py-1 border border-gray-300 rounded-md text-gray-400 bg-gray-100"
                  >
                    Précédent
                  </button>
                  <button
                    disabled
                    className="px-3 py-1 border border-gray-300 rounded-md text-gray-400 bg-gray-100"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 