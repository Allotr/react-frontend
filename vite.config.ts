import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      filename: 'service-worker.ts',
      includeManifestIcons: false,
      injectRegister: false,
      srcDir: 'src/',
      strategies: 'injectManifest',
      manifest: {
        short_name: "Allotr",
        name: "Allotr",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon"
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any"
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any"
          },
          {
            src: "maskable_logo512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          },
          {
            src: "maskable_logo192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff"
      },
      injectManifest: {
        injectionPoint: undefined
      }
    })
  ],
  build: { chunkSizeWarningLimit: 1000 }
})
