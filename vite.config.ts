import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      filename: 'service-worker.ts',
      injectRegister: 'auto',
      srcDir: 'src/',
      strategies: 'injectManifest',
      injectManifest: {
        injectionPoint: undefined
      }
    })
  ],
  build: { chunkSizeWarningLimit: 1000 }
})
