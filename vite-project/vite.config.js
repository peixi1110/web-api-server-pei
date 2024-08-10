import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs/promises';
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
  alias:{
      '@' : path.resolve(__dirname, 'src')
  }},
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
