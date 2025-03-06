import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Création du client Supabase avec les types de la base de données
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Fonction pour récupérer l'utilisateur actuel
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Fonction pour récupérer le profil utilisateur
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    return null;
  }
  
  return data;
}

// Fonction pour récupérer les profils de prospection d'un utilisateur
export async function getUserProspectionProfiles(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erreur lors de la récupération des profils de prospection:', error);
    return [];
  }
  
  return data;
}

// Fonction pour récupérer l'historique des recherches d'un utilisateur
export async function getUserSearchHistory(userId: string) {
  const { data, error } = await supabase
    .from('search_history')
    .select('*, profiles(name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erreur lors de la récupération de l\'historique des recherches:', error);
    return [];
  }
  
  return data;
}

// Fonction pour récupérer les leads d'un utilisateur
export async function getUserLeads(userId: string) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .or(`created_by.eq.${userId},assigned_to.eq.${userId}`)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erreur lors de la récupération des leads:', error);
    return [];
  }
  
  return data;
}

// Fonction pour récupérer le statut des leads d'un utilisateur
export async function getUserLeadStatuses(userId: string) {
  const { data, error } = await supabase
    .from('lead_status')
    .select('*, leads(company_name, contact_name, email)')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('Erreur lors de la récupération des statuts des leads:', error);
    return [];
  }
  
  return data;
} 