import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vite keeps the development setup small and fast.
// The React plugin enables JSX support and development niceties like Fast Refresh.
export default defineConfig({
  plugins: [react()],
  server: {
    // Browsers block cross-origin requests by default when the target server
    // does not allow them. This development proxy lets the React app call
    // "/ollama/*" on the same origin, and Vite forwards the request to the
    // local Ollama server running on port 11434.
    proxy: {
      '/ollama': {
        target: 'http://localhost:11434',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ollama/, ''),
      },
    },
  },
})
