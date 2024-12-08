import { defineConfig, transformerDirectives } from 'unocss'
import attributify from 'unocss/preset-attributify'
import uno from 'unocss/preset-uno'
import { themeConfig } from './src/helpers/theme'

export default defineConfig({
  presets: [
    uno(),
    attributify(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: themeConfig(),
})
