import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vite keeps the development setup small and fast.
// The React plugin enables JSX support and development niceties like Fast Refresh.
export default defineConfig({
  plugins: [react()],
})
