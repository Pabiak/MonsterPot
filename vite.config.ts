/* eslint-disable */

import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_']);

  return {
    plugins: [
      react(),
      svgr(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Pottery4.0',
          short_name: 'Pottery',
          description: 'Praca Magisterska - Pottery4.0',
          "start_url": "/",
          display: "standalone",
          background_color: "#50B57A",
          theme_color: "#50B57A",
          icons: [
            {
              "src": "/pwa-192x192.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "/pwa-512x512.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "/pwa-maskable-192x192.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": "/pwa-maskable-512x512.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "maskable"
            }
          ],
        },
      }),
    ],
    server: {
      port: 3000,
      open: true,
    },
    define: {
      'process.env': {
        ENV_VARIABLE: env.VARIABLE,
      },
      global: {},
      anotherVariable: {},
    },
    resolve: {
      alias: {
        '@': process.cwd() + '/src',
      },
    },
    test: {
      environment: 'happy-dom',
      coverage: {
        reporter: ['cobertura', 'text'],
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});
