import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  cacheDir: resolve(__dirname, '../../node_modules/.vite'),
});
