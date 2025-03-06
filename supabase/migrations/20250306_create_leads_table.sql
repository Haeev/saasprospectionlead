-- Création de la table des leads de prospection
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Informations de base du lead
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  -- Informations de qualification
  industry TEXT,
  company_size TEXT,
  annual_revenue TEXT,
  -- Informations de suivi
  status TEXT NOT NULL DEFAULT 'nouveau', -- nouveau, contacté, qualifié, proposition, gagné, perdu
  notes TEXT,
  -- Champs de traçabilité
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id)
);

-- Création d'un index sur le statut pour faciliter les recherches
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);

-- Création d'un index sur l'email pour faciliter les recherches
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);

-- Création d'un trigger pour mettre à jour le champ updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Mise en place des politiques RLS (Row Level Security)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs authentifiés de voir leurs propres leads
CREATE POLICY "Users can view their own leads"
ON public.leads
FOR SELECT
USING (auth.uid() = created_by OR auth.uid() = assigned_to);

-- Politique pour permettre aux utilisateurs authentifiés de créer leurs propres leads
CREATE POLICY "Users can create leads"
ON public.leads
FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Politique pour permettre aux utilisateurs authentifiés de mettre à jour leurs propres leads
CREATE POLICY "Users can update their own leads"
ON public.leads
FOR UPDATE
USING (auth.uid() = created_by OR auth.uid() = assigned_to);

-- Politique pour permettre aux utilisateurs authentifiés de supprimer leurs propres leads
CREATE POLICY "Users can delete their own leads"
ON public.leads
FOR DELETE
USING (auth.uid() = created_by); 