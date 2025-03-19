import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import removeConsole from 'vite-plugin-remove-console'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(), removeConsole()],
  build: {
    target: 'esnext'
  },
  esbuild: {
    drop: ['console', 'debugger'],
    target: 'esnext'
  },
})