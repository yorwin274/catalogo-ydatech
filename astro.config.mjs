// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build
export default defineConfig({
  output: 'server',

  // 🚀 PERMITIMOS QUE ASTRO LEA Y MUESTRE LAS IMÁGENES DE TU BUCKET DE SUPABASE
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Autoriza las fotos de tu Storage
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});
