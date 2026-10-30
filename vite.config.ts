import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import chapters from './src/chapters.json' with { type: 'json' };

export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: 'mpa',
  server: { host: '127.0.0.1', port: 8137 },
  preview: { host: '127.0.0.1', port: 8137 },
  build: {
    rollupOptions: { input: Object.fromEntries(['index.html', 'equations/index.html', ...chapters.map(c => `${c.slug}/index.html`)].map(p => [p, resolve(import.meta.dirname, p)])) },
  },
});
