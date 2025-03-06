# SaaS Prospection Lead

Une application SaaS pour la gestion de leads de prospection commerciale, construite avec Next.js, Supabase et déployée sur Vercel.

## Technologies utilisées

- **Frontend**: Next.js avec App Router, TypeScript, Tailwind CSS
- **Backend/Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **Hébergement**: Vercel
- **CI/CD**: Intégration continue via GitHub et Vercel

## Fonctionnalités

- Authentification utilisateur (inscription, connexion, déconnexion)
- Interface utilisateur responsive
- Sécurité des données avec Row Level Security de Supabase

## Configuration locale

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Compte Supabase
- Compte Vercel (pour le déploiement)

### Installation

1. Cloner le dépôt
```bash
git clone <url-du-repo>
cd saasprospectionlead
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
Créer un fichier `.env.local` à la racine du projet avec les variables suivantes:
```
NEXT_PUBLIC_SUPABASE_URL=<votre-url-supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<votre-clé-anon-supabase>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Démarrer le serveur de développement
```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Déploiement

Le projet est configuré pour être déployé automatiquement sur Vercel à chaque push sur la branche principale.

### Configuration du déploiement

1. Connecter votre dépôt GitHub à Vercel
2. Configurer les variables d'environnement dans Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`

## Structure du projet

```
saasprospectionlead/
├── app/                    # App Router de Next.js
│   ├── auth/               # Routes d'authentification
│   ├── login/              # Page de connexion
│   └── ...                 # Autres pages
├── utils/                  # Utilitaires
│   └── supabase/           # Configuration Supabase
├── public/                 # Fichiers statiques
├── .env.local              # Variables d'environnement locales
└── ...                     # Autres fichiers de configuration
```

## Licence

MIT
