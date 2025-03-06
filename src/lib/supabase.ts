import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Création du client Supabase avec les types de la base de données
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Données fictives pour le mode de secours
const MOCK_DATA = {
  user: {
    id: 'mock-user-id',
    email: 'utilisateur@exemple.com',
    created_at: new Date().toISOString()
  },
  profile: {
    id: 'mock-profile-id',
    user_id: 'mock-user-id',
    full_name: 'Utilisateur Test',
    company: 'Entreprise Test',
    role: 'Testeur',
    created_at: new Date().toISOString()
  },
  profiles: [
    {
      id: 'mock-profile-1',
      user_id: 'mock-user-id',
      name: 'Profil de test 1',
      is_default: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-profile-2',
      user_id: 'mock-user-id',
      name: 'Profil de test 2',
      is_default: false,
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  leads: [
    {
      id: 'mock-lead-1',
      user_id: 'mock-user-id',
      company_name: 'Entreprise A',
      contact_name: 'Contact A',
      email: 'contacta@exemple.com',
      status: 'nouveau',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-lead-2',
      user_id: 'mock-user-id',
      company_name: 'Entreprise B',
      contact_name: 'Contact B',
      email: 'contactb@exemple.com',
      status: 'contacté',
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'mock-lead-3',
      user_id: 'mock-user-id',
      company_name: 'Entreprise C',
      contact_name: 'Contact C',
      email: 'contactc@exemple.com',
      status: 'qualifié',
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ],
  search_history: [
    {
      id: 'mock-search-1',
      user_id: 'mock-user-id',
      search_name: 'Recherche test 1',
      results_count: 42,
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-search-2',
      user_id: 'mock-user-id',
      search_name: 'Recherche test 2',
      results_count: 18,
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ]
};

// Fonction pour récupérer l'utilisateur actuel
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    // Retourner des données fictives en cas d'erreur
    return MOCK_DATA.user;
  }
}

// Fonction pour récupérer le profil utilisateur
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    // Retourner des données fictives en cas d'erreur
    return MOCK_DATA.profile;
  }
}

// Fonction pour récupérer les profils de prospection d'un utilisateur
export async function getUserProspectionProfiles(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des profils de prospection:', error);
    // Retourner des données fictives en cas d'erreur
    return MOCK_DATA.profiles;
  }
}

// Fonction pour récupérer l'historique des recherches d'un utilisateur
export async function getUserSearchHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from('search_history')
      .select('*, profiles(name)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des recherches:', error);
    // Retourner des données fictives en cas d'erreur
    return MOCK_DATA.search_history;
  }
}

// Fonction pour récupérer les leads d'un utilisateur
export async function getUserLeads(userId: string) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .or(`created_by.eq.${userId},assigned_to.eq.${userId}`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des leads:', error);
    // Retourner des données fictives en cas d'erreur
    return MOCK_DATA.leads;
  }
}

// Fonction pour récupérer le statut des leads d'un utilisateur
export async function getUserLeadStatuses(userId: string) {
  try {
    const { data, error } = await supabase
      .from('lead_status')
      .select('*, leads(company_name, contact_name, email)')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des statuts des leads:', error);
    // Retourner un tableau vide en cas d'erreur
    return [];
  }
} 