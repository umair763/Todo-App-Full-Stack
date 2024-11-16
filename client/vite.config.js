// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   plugins: [react()],
   optimizeDeps: {
      include: ['@react-oauth/google'],
   },
   build: {
      rollupOptions: {
         external: ['@react-oauth/google'],
      },
   },
   ssr: {
      noExternal: ['@react-oauth/google'], // Prevent SSR bundling
   },
});
