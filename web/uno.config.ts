import { iconsPresetConfig, themeConfig } from '@qd/design/helpers'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'
import attributify from 'unocss/preset-attributify'
import icons from 'unocss/preset-icons'
import tagify from 'unocss/preset-tagify'
import uno from 'unocss/preset-uno'

export default defineConfig({
  presets: [
    uno(),
    icons({
      ...iconsPresetConfig(
        [
          { name: 'qd', glob: 'public/**/*.svg' },
        ],
        { editorSettingsPath: '../.vscode/settings.json' },
      ),
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    attributify(),
    tagify(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  theme: themeConfig(),
})
