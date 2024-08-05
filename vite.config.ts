import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: ['node_modules', 'dist', 'build'],
    include: ['src/**/*.spec.ts'],
  }
})
