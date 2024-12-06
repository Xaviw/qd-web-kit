import { nodeExternals } from 'rollup-plugin-node-externals'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { postcssPluginPalette } from './src/helpers/palettePlugin'
import { paletteNames } from './src/helpers/theme'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/web.ts', 'src/css.ts', 'src/helpers.ts'],
      fileName: (_, name) => `${name}.mjs`,
      formats: ['es'],
    },
  },
  css: {
    postcss: {
      plugins: [
        // 使用paletteNames，保证生成的css变量与unocss配置一致
        postcssPluginPalette([
          { path: '/src/css/default-theme-tokens.css', names: paletteNames },
          { path: '/src/css/dark-theme-tokens.css', names: paletteNames },
        ]),
      ],
    },
  },
  plugins: [
    UnoCSS(),
    nodeExternals({ exclude: ['@ctrl/tinycolor', 'theme-colors'] }),
    dts(),
  ],
})
