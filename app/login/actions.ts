'use server'

import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Action serveur pour gérer la connexion d'un utilisateur
 * 
 * @param formData - Les données du formulaire de connexion
 */
export async function login(formData: FormData) {
  try {
    // Récupération des données du formulaire
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    // Vérification des données
    if (!email || !password) {
      redirect('/login?error=Veuillez remplir tous les champs')
    }
    
    // Création du client Supabase
    const supabase = await createClient()

    // Tentative de connexion avec email et mot de passe
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    // Redirection en cas d'erreur
    if (error) {
      console.error('Erreur de connexion:', error.message)
      redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    // Redirection vers la page d'accueil en cas de succès
    redirect('/')
  } catch (error) {
    console.error('Erreur inattendue lors de la connexion:', error)
    redirect('/login?error=Une erreur inattendue s\'est produite')
  }
}

/**
 * Action serveur pour gérer l'inscription d'un utilisateur
 * 
 * @param formData - Les données du formulaire d'inscription
 */
export async function signup(formData: FormData) {
  try {
    // Récupération des données du formulaire
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    // Vérification des données
    if (!email || !password) {
      redirect('/login?error=Veuillez remplir tous les champs')
    }
    
    // Vérification de la force du mot de passe
    if (password.length < 6) {
      redirect('/login?error=Le mot de passe doit contenir au moins 6 caractères')
    }
    
    // Création du client Supabase
    const supabase = await createClient()

    // Construction de l'URL de redirection complète
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const redirectTo = `${origin}/auth/callback`

    console.log('URL de redirection:', redirectTo)

    // Tentative d'inscription avec email et mot de passe
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // URL de redirection après confirmation de l'email
        emailRedirectTo: redirectTo,
      },
    })

    // Redirection en cas d'erreur
    if (error) {
      console.error('Erreur d\'inscription:', error.message)
      redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    // Redirection avec message de succès
    redirect('/login?message=Inscription réussie. Vous pouvez maintenant vous connecter.')
  } catch (error) {
    console.error('Erreur inattendue lors de l\'inscription:', error)
    redirect('/login?error=Une erreur inattendue s\'est produite')
  }
} 