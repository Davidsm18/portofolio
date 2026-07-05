import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Lokaal: stuur /api en /uploads door naar de backend (poort 3003).
  // Op de VPS doet Nginx dit — daar is deze proxy niet actief.
  server: {
    proxy: {
      '/api': 'http://localhost:3003',
      '/uploads': 'http://localhost:3003',
    },
  },
})
