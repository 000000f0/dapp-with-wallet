import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  
  },
  base: process.env.VERCEL ? './' : (process.env.GH_PAGES ? '/demo-dapp-with-wallet/' : './'),
  server: {
    fs: {
      allow: ['../sdk', './'],
    },
  },
})

