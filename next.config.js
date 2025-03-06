/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration TypeScript
  typescript: {
    // Permet de compiler même en présence d'erreurs TypeScript
    // Utile pour le déploiement, mais à utiliser avec précaution
    ignoreBuildErrors: true,
  },
  // Désactivation d'ESLint lors du build
  eslint: {
    // Désactive la vérification ESLint lors du build
    // Utile pour le déploiement, mais à utiliser avec précaution
    ignoreDuringBuilds: true,
  },
  // Autres configurations peuvent être ajoutées ici
}

module.exports = nextConfig 