import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/mi-organizador/",  // 👈 Asegura que coincida con el nombre de tu repo en GitHub
  plugins: [react()],
});

