import { defineConfig } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: './',
  plugins: [
    svgr(),
    react(),
    tsconfigPaths(),
    eslint({
      exclude: ['/virtual:/**', 'node_modules/**'],
    }),
    VitePluginFonts({
      google: {
        families: ['Open Sans'],
      },
    }),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
