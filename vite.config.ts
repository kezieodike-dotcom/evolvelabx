import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
const portArgument = process.argv.indexOf('--port');
const devPort = Number(portArgument >= 0 ? process.argv[portArgument + 1] : process.env.DEV_PORT || 3002);

export default defineConfig(() => {
  return {
    cacheDir: `node_modules/.vite-dev-${devPort}`,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      port: devPort,
      strictPort: true,
      host: '127.0.0.1',
      proxy: { '/api': 'http://127.0.0.1:3001', '/sitemap.xml': 'http://127.0.0.1:3001', '/robots.txt': 'http://127.0.0.1:3001' },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
