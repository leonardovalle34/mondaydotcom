
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [react()]
});
