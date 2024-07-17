import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'cdn',
    minify: 'esbuild',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      // eslint-disable-next-line no-undef
      entry: resolve(__dirname, './src/index.ts'),
      name: 'CodeBubble',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
  },
});
