import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig({
   plugins: [react()],
   optimizeDeps: {
      include: ['@react-oauth/google'], // Force pre-bundling of the dependency
   },
});
