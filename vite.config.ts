import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5173,
    open: true,
    strictPort: false
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    outDir: 'dist'
  },
  resolve: {
    alias: {
      $lib: '/src/lib',
      $components: '/src/lib',
      $types: '/src/types',
      $data: '/src/data'
    }
  }
})
