import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@scootify/shared': path.resolve(__dirname, '../shared/src'),
      '@scootify/shared/*': path.resolve(__dirname, '../shared/src/*'),
    },
  },
  test: {
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    environment: 'node',
  },
});
