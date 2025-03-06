# SaaS Prospection Lead

Une application SaaS pour la gestion de leads de prospection commerciale, construite avec Next.js, Supabase et déployée sur Vercel.

## Technologies utilisées

- **Frontend**: Next.js avec App Router, TypeScript, Tailwind CSS
- **Backend/Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **Hébergement**: Vercel
- **CI/CD**: Déploiement manuel sur Vercel

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

## Déploiement sur Vercel

Le projet est configuré pour être déployé manuellement sur Vercel. Nous avons désactivé le déploiement automatique pour avoir plus de contrôle sur le processus.

### Processus de déploiement manuel

1. Installer Vercel CLI (si ce n'est pas déjà fait)
```bash
npm install -g vercel
```

2. Se connecter à Vercel (si ce n'est pas déjà fait)
```bash
vercel login
```

3. Déployer le projet en prévisualisation
```bash
vercel
```

4. Vérifier que tout fonctionne correctement dans l'environnement de prévisualisation

5. Déployer en production
```bash
vercel --prod
```

### Vérification des logs de déploiement

Si vous rencontrez des problèmes lors du déploiement, vous pouvez consulter les logs :

```bash
# Lister les déploiements récents
vercel list

# Consulter les logs d'un déploiement spécifique
vercel logs <url-du-déploiement>
```

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

## Bonnes pratiques de code

- **Simplicité**: Nous privilégions un code simple et lisible plutôt que des solutions complexes
- **Commentaires**: Chaque fichier et fonction est commenté pour faciliter la maintenance
- **TypeScript**: Nous utilisons TypeScript pour la sécurité des types, mais avec `ignoreBuildErrors: true` pour éviter les blocages lors du déploiement

## Licence

MIT
