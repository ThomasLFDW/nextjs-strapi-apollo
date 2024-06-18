import TerserPlugin from 'terser-webpack-plugin';


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // Ajoutez ici votre domaine de Strapi
  },
  webpack(config, {isServer}) {
    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,    // Supprime les console.log
              drop_debugger: true,   // Supprime les déclarations debugger
              dead_code: true,       // Supprime les codes morts
              conditionals: true,    // Optimise les expressions conditionnelles
              unused: true,          // Supprime les variables et fonctions inutilisées
              toplevel: true,        // Applique des compressions au niveau supérieur
              inline: true,          // Inline les fonctions simples
            },
            mangle: {
              toplevel: true,        // Renomme les variables et fonctions au niveau supérieur
            },
            output: {
              comments: false,       // Supprime les commentaires
            },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;


