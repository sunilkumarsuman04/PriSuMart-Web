import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { APP_CONFIG } from './src/config/app.config';

// Fills __PLAY_STORE_URL__ in index.html (structured data, <noscript>) from the
// central config so the store URL is never duplicated by hand.
const htmlConfigPlugin = () => ({
  name: 'prisumart-html-config',
  transformIndexHtml(html: string) {
    return html.replaceAll('__PLAY_STORE_URL__', APP_CONFIG.playStoreUrl);
  },
});

export default defineConfig({
  plugins: [react(), htmlConfigPlugin()],
  server: {
    // Forwards /api/* requests to a separately running `vercel dev` instance
    // (see README → "Running Locally") so the Gemini-backed chatbot endpoint
    // works under plain `npm run dev`, without routing the whole frontend
    // through `vercel dev`'s own proxy — which has a known incompatibility
    // with Vite's dev-server HTML/module transform pipeline.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('react-icons')) return 'icons';
            if (id.includes('react-router') || id.includes('/react/') || id.includes('react-dom')) return 'react-vendor';
            return 'vendor';
          }
        },
      },
    },
  },
});
