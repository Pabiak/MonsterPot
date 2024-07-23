/* eslint-disable */

import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_']);

  return {
    plugins: [react(), svgr()],
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
