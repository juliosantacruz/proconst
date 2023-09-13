import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/proconst/',
  plugins: [react()],
  ...(process.env.NODE_ENV === 'development'
  ? {
    define: {
      global: {},
    },
  }
  : {}),
resolve: {
  alias: {
    ...(process.env.NODE_ENV !== 'development'
      ? {
        './runtimeConfig': './runtimeConfig.browser', //fix production build
      }
      : {}),
  },
},
})
