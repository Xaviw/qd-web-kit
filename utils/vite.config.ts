import nodeExternals from 'rollup-plugin-node-externals'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts'],
      fileName: (_, name) => `${name}.mjs`,
      formats: ['es'],
    },
  },
  plugins: [nodeExternals({ devDeps: true }), dts()],
})
