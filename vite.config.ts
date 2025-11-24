import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
  server: { port: 5173, open: true, hmr: { host: 'localhost' }, watch: { usePolling: true } },
  build: {
    outDir: 'dist',  // default, Vercel reads static-build from here
    sourcemap: false,
  },
  base: '/',  // Make sure all routes/assets resolve correctly on Vercel
});