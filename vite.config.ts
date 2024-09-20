import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    host: process.env.VITE_HOST,
    port: parseInt(process.env.VITE_PORT)
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    svgLoader(),
  ],
})}
