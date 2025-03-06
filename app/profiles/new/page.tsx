'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../src/lib/supabase';

// Types pour le formulaire de profil
interface ProfileFormData {
  name: string;
  description: string;
  industry: string[];
  company_size: string[];
  location: string[];
  location_radius: number | null;
  min_annual_revenue: number | null;
  max_annual_revenue: number | null;
  min_company_age: number | null;
  max_company_age: number | null;
  has_website: boolean | null;
  has_social_media: boolean | null;
  naf_codes: string[];
  keywords: string[];
  is_default: boolean;
}

export default function NewProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // État initial du formulaire
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    description: '',
    industry: [],
    company_size: [],
    location: [],
    location_radius: null,
    min_annual_revenue: null,
    max_annual_revenue: null,
    min_company_age: null,
    max_company_age: null,
    has_website: null,
    has_social_media: null,
    naf_codes: [],
    keywords: [],
    is_default: false
  });

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

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Gestion des cases à cocher
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }
    
    // Gestion des champs numériques
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? null : Number(value)
      }));
      return;
    }
    
    // Gestion des champs texte
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour gérer les changements dans les champs à sélection multiple
  const handleMultiSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name as keyof ProfileFormData] as string[];
      
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

  // Fonction pour gérer les changements dans les champs de liste (séparés par des virgules)
  const handleListChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Convertir la chaîne en tableau en séparant par des virgules
    const valueArray = value.split(',').map(item => item.trim()).filter(item => item !== '');
    
    setFormData(prev => ({
      ...prev,
      [name]: valueArray
    }));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Récupération de l'utilisateur actuel
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      // Création du profil dans la base de données
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          ...formData,
          user_id: user.id
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      // Affichage du message de succès
      setSuccess(true);
      
      // Redirection vers le tableau de bord après 2 secondes
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error('Erreur lors de la création du profil:', error);
      setError(error.message || 'Une erreur est survenue lors de la création du profil.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Créer un nouveau profil de prospection</h1>
      
      {/* Message de succès */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Profil créé avec succès ! Redirection vers le tableau de bord...</p>
        </div>
      )}
      
      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Informations de base */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Informations de base</h2>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Nom du profil *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Entreprises de technologie à Paris"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description de ce profil de prospection"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_default"
                checked={formData.is_default}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Définir comme profil par défaut</span>
            </label>
          </div>
        </div>
        
        {/* Critères sectoriels */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Critères sectoriels</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Secteurs d'activité
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {industryOptions.map(industry => (
                <label key={industry} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.industry.includes(industry)}
                    onChange={() => handleMultiSelectChange('industry', industry)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{industry}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Taille d'entreprise
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {companySizeOptions.map(size => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.company_size.includes(size)}
                    onChange={() => handleMultiSelectChange('company_size', size)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="min_annual_revenue" className="block text-gray-700 font-medium mb-2">
                Chiffre d'affaires minimum (€)
              </label>
              <input
                type="number"
                id="min_annual_revenue"
                name="min_annual_revenue"
                value={formData.min_annual_revenue || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 100000"
              />
            </div>
            
            <div>
              <label htmlFor="max_annual_revenue" className="block text-gray-700 font-medium mb-2">
                Chiffre d'affaires maximum (€)
              </label>
              <input
                type="number"
                id="max_annual_revenue"
                name="max_annual_revenue"
                value={formData.max_annual_revenue || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 10000000"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="min_company_age" className="block text-gray-700 font-medium mb-2">
                Âge minimum de l'entreprise (années)
              </label>
              <input
                type="number"
                id="min_company_age"
                name="min_company_age"
                value={formData.min_company_age || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 2"
              />
            </div>
            
            <div>
              <label htmlFor="max_company_age" className="block text-gray-700 font-medium mb-2">
                Âge maximum de l'entreprise (années)
              </label>
              <input
                type="number"
                id="max_company_age"
                name="max_company_age"
                value={formData.max_company_age || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="has_website"
                  checked={formData.has_website === true}
                  onChange={(e) => setFormData(prev => ({ ...prev, has_website: e.target.checked ? true : null }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">A un site web</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="has_social_media"
                  checked={formData.has_social_media === true}
                  onChange={(e) => setFormData(prev => ({ ...prev, has_social_media: e.target.checked ? true : null }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Présent sur les réseaux sociaux</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Critères géographiques */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Critères géographiques</h2>
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
              Localisations (séparées par des virgules)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location.join(', ')}
              onChange={handleListChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Paris, Lyon, Marseille"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="location_radius" className="block text-gray-700 font-medium mb-2">
              Rayon de recherche (km)
            </label>
            <input
              type="number"
              id="location_radius"
              name="location_radius"
              value={formData.location_radius || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 50"
            />
          </div>
        </div>
        
        {/* Critères spécifiques */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Critères spécifiques</h2>
          
          <div className="mb-4">
            <label htmlFor="naf_codes" className="block text-gray-700 font-medium mb-2">
              Codes NAF (séparés par des virgules)
            </label>
            <input
              type="text"
              id="naf_codes"
              name="naf_codes"
              value={formData.naf_codes.join(', ')}
              onChange={handleListChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 6201Z, 6202A, 6209Z"
            />
            <p className="text-sm text-gray-500 mt-1">
              Codes d'activité selon la nomenclature NAF (ex: 6201Z pour la programmation informatique)
            </p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="keywords" className="block text-gray-700 font-medium mb-2">
              Mots-clés (séparés par des virgules)
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={formData.keywords.join(', ')}
              onChange={handleListChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: innovation, startup, digital"
            />
          </div>
        </div>
        
        {/* Boutons d'action */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Annuler
          </button>
          
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Création en cours...' : 'Créer le profil'}
          </button>
        </div>
      </form>
    </div>
  );
} 