-- Création de la table users pour étendre les informations des utilisateurs
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Informations de base de l'utilisateur
  email TEXT NOT NULL,
  full_name TEXT,
  display_name TEXT,
  avatar_url TEXT,
  -- Rôle et permissions
  role TEXT NOT NULL DEFAULT 'user', -- user, admin
  -- Préférences utilisateur
  notification_email BOOLEAN DEFAULT TRUE,
  notification_web BOOLEAN DEFAULT TRUE,
  -- Champs de traçabilité
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  last_sign_in TIMESTAMP WITH TIME ZONE
);

-- Création d'un index sur l'email pour faciliter les recherches
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users (email);

-- Création d'un trigger pour mettre à jour le champ updated_at
CREATE OR REPLACE FUNCTION update_users_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION update_users_updated_at_column();

-- Mise en place des politiques RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs authentifiés de voir leur propre profil
CREATE POLICY "Users can view their own profile"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Politique pour permettre aux utilisateurs authentifiés de mettre à jour leur propre profil
CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id);

-- Fonction pour créer automatiquement un profil utilisateur lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour appeler la fonction lors de l'inscription d'un nouvel utilisateur
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Création de la table profiles pour stocker les critères de prospection des utilisateurs
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Référence à l'utilisateur propriétaire
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  -- Nom du profil
  name TEXT NOT NULL,
  description TEXT,
  -- Critères de prospection
  industry TEXT[], -- Secteurs d'activité ciblés
  company_size TEXT[], -- Tailles d'entreprise ciblées (TPE, PME, ETI, GE)
  location TEXT[], -- Localisations ciblées (pays, régions, départements, villes)
  location_radius INTEGER, -- Rayon de recherche en km
  min_annual_revenue NUMERIC, -- Chiffre d'affaires minimum
  max_annual_revenue NUMERIC, -- Chiffre d'affaires maximum
  min_company_age INTEGER, -- Âge minimum de l'entreprise en années
  max_company_age INTEGER, -- Âge maximum de l'entreprise en années
  has_website BOOLEAN, -- L'entreprise doit avoir un site web
  has_social_media BOOLEAN, -- L'entreprise doit être présente sur les réseaux sociaux
  naf_codes TEXT[], -- Codes NAF ciblés
  keywords TEXT[], -- Mots-clés pour la recherche
  -- Paramètres de recherche
  is_default BOOLEAN DEFAULT FALSE, -- Profil par défaut pour l'utilisateur
  -- Champs de traçabilité
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE
);

-- Création d'un index sur l'utilisateur pour faciliter les recherches
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON public.profiles (user_id);

-- Création d'un trigger pour mettre à jour le champ updated_at
CREATE OR REPLACE FUNCTION update_profiles_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION update_profiles_updated_at_column();

-- Mise en place des politiques RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs authentifiés de voir leurs propres profils
CREATE POLICY "Users can view their own profiles"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de créer leurs propres profils
CREATE POLICY "Users can create profiles"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de mettre à jour leurs propres profils
CREATE POLICY "Users can update their own profiles"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de supprimer leurs propres profils
CREATE POLICY "Users can delete their own profiles"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Fonction pour s'assurer qu'un seul profil par utilisateur est défini comme profil par défaut
CREATE OR REPLACE FUNCTION public.ensure_single_default_profile()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default THEN
    UPDATE public.profiles
    SET is_default = FALSE
    WHERE user_id = NEW.user_id AND id != NEW.id AND is_default = TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour appeler la fonction lors de l'insertion ou de la mise à jour d'un profil
CREATE TRIGGER ensure_single_default_profile
  BEFORE INSERT OR UPDATE OF is_default ON public.profiles
  FOR EACH ROW
  WHEN (NEW.is_default = TRUE)
  EXECUTE FUNCTION public.ensure_single_default_profile();

-- Création de la table search_history pour enregistrer l'historique des recherches
CREATE TABLE IF NOT EXISTS public.search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Référence à l'utilisateur
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  -- Référence au profil utilisé (optionnel)
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  -- Paramètres de recherche
  search_params JSONB NOT NULL, -- Stockage des paramètres de recherche au format JSON
  search_name TEXT, -- Nom donné à la recherche (optionnel)
  -- Résultats
  results_count INTEGER NOT NULL DEFAULT 0, -- Nombre de résultats trouvés
  -- Champs de traçabilité
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  -- Statut de la recherche
  is_favorite BOOLEAN DEFAULT FALSE, -- Recherche marquée comme favorite
  is_saved BOOLEAN DEFAULT FALSE -- Recherche sauvegardée pour réutilisation
);

-- Création d'un index sur l'utilisateur pour faciliter les recherches
CREATE INDEX IF NOT EXISTS search_history_user_id_idx ON public.search_history (user_id);

-- Création d'un index sur le profil pour faciliter les recherches
CREATE INDEX IF NOT EXISTS search_history_profile_id_idx ON public.search_history (profile_id);

-- Mise en place des politiques RLS (Row Level Security)
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs authentifiés de voir leur propre historique de recherche
CREATE POLICY "Users can view their own search history"
ON public.search_history
FOR SELECT
USING (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de créer des entrées dans leur historique
CREATE POLICY "Users can create search history entries"
ON public.search_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de mettre à jour leur propre historique
CREATE POLICY "Users can update their own search history"
ON public.search_history
FOR UPDATE
USING (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de supprimer des entrées de leur historique
CREATE POLICY "Users can delete their own search history"
ON public.search_history
FOR DELETE
USING (auth.uid() = user_id);

-- Création de la table lead_status pour suivre l'état des leads
CREATE TABLE IF NOT EXISTS public.lead_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Référence au lead
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  -- Référence à l'utilisateur
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  -- Statut du lead
  status TEXT NOT NULL DEFAULT 'nouveau', -- nouveau, contacté, qualifié, proposition, gagné, perdu
  -- Informations de suivi
  notes TEXT, -- Notes sur le lead
  next_action TEXT, -- Prochaine action à effectuer
  next_action_date TIMESTAMP WITH TIME ZONE, -- Date de la prochaine action
  -- Historique des communications
  last_contact_date TIMESTAMP WITH TIME ZONE, -- Date du dernier contact
  last_contact_method TEXT, -- Méthode du dernier contact (email, téléphone, etc.)
  -- Champs de traçabilité
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Création d'un index sur le lead pour faciliter les recherches
CREATE INDEX IF NOT EXISTS lead_status_lead_id_idx ON public.lead_status (lead_id);

-- Création d'un index sur l'utilisateur pour faciliter les recherches
CREATE INDEX IF NOT EXISTS lead_status_user_id_idx ON public.lead_status (user_id);

-- Création d'un index sur le statut pour faciliter les recherches
CREATE INDEX IF NOT EXISTS lead_status_status_idx ON public.lead_status (status);

-- Création d'un trigger pour mettre à jour le champ updated_at
CREATE OR REPLACE FUNCTION update_lead_status_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_lead_status_updated_at
BEFORE UPDATE ON public.lead_status
FOR EACH ROW
EXECUTE FUNCTION update_lead_status_updated_at_column();

-- Mise en place des politiques RLS (Row Level Security)
ALTER TABLE public.lead_status ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs authentifiés de voir leurs propres statuts de lead
CREATE POLICY "Users can view their own lead statuses"
ON public.lead_status
FOR SELECT
USING (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de créer des statuts pour leurs leads
CREATE POLICY "Users can create lead statuses"
ON public.lead_status
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de mettre à jour leurs propres statuts de lead
CREATE POLICY "Users can update their own lead statuses"
ON public.lead_status
FOR UPDATE
USING (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de supprimer leurs propres statuts de lead
CREATE POLICY "Users can delete their own lead statuses"
ON public.lead_status
FOR DELETE
USING (auth.uid() = user_id); 