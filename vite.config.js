import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/mi-organizador/",  // 👈 Asegura que el nombre coincide con el repo en GitHub
  plugins: [react()],
});

