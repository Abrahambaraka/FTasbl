import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isAndroid = mode === 'android';
    return {
      base: isAndroid ? './' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          manifest: {
            name: 'Fondation TUSAIDIYANE',
            short_name: 'TUSAIDIYANE',
            description: "Agir pour la solidarité et le bien-être des populations vulnérables en RDC.",
            theme_color: '#0056b3',
            background_color: '#ffffff',
            display: 'standalone',
            lang: 'fr',
            start_url: isAndroid ? './index.html' : '/',
            icons: [
              { src: '/logo.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
              { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            ],
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          },
        }),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.VITE_API_BASE_URL': JSON.stringify(isAndroid ? 'https://www.fondationtusaidiyane.com' : ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
