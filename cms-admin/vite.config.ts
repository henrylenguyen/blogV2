import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
// https://vitejs.dev/config/

dotenv.config({ path: path.resolve(__dirname, '../.env') })
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
