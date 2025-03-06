/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration TypeScript
  typescript: {
    // Permet de compiler même en présence d'erreurs TypeScript
    // Utile pour le déploiement, mais à utiliser avec précaution
    ignoreBuildErrors: true,
  },
  // Autres configurations peuvent être ajoutées ici
}

module.exports = nextConfig 