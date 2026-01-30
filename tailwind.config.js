/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'game-dark': '#1a1a2e',
        'game-blue': '#16213e',
        'game-accent': '#0f3460',
        'game-gold': '#e94560',
        'game-green': '#2a9d8f'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
