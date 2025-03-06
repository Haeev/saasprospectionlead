'use server'

import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Action serveur pour gérer la connexion d'un utilisateur
 * 
 * @param formData - Les données du formulaire de connexion
 */
export async function login(formData: FormData) {
  // Récupération des données du formulaire
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // Création du client Supabase
  const supabase = await createClient()

  // Tentative de connexion avec email et mot de passe
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Redirection en cas d'erreur
  if (error) {
    redirect('/login?error=Identifiants invalides')
  }

  // Redirection vers la page d'accueil en cas de succès
  redirect('/')
}

/**
 * Action serveur pour gérer l'inscription d'un utilisateur
 * 
 * @param formData - Les données du formulaire d'inscription
 */
export async function signup(formData: FormData) {
  // Récupération des données du formulaire
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // Création du client Supabase
  const supabase = await createClient()

  // Tentative d'inscription avec email et mot de passe
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // URL de redirection après confirmation de l'email
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  // Redirection en cas d'erreur
  if (error) {
    redirect('/login?error=Erreur lors de l\'inscription')
  }

  // Redirection avec message de succès
  redirect('/login?message=Vérifiez votre email pour confirmer votre inscription')
} 