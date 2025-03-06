import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">SaaS Prospection Lead</h1>
        
        {user ? (
          <div className="bg-white p-8 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Bienvenue, {user.email}</h2>
            <p className="mb-4">Vous êtes connecté à votre compte.</p>
            <form action={signOut}>
              <button 
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md w-full text-center">
            <h2 className="text-2xl font-semibold mb-4">Vous n'êtes pas connecté</h2>
            <Link 
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </main>
  )
} 