import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.mjs', '.js', '.ts', '.vue', '.json'], // Ensure .mjs is recognized
  },
  optimizeDeps: {
    include: ['vue-i18n'],
  },
  define: {
    global: {}, 
  },
});