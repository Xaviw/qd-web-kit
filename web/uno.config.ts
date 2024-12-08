import { iconsPresetConfig, themeConfig } from '@qd/design/helpers'
import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import attributify from 'unocss/preset-attributify'
import icons from 'unocss/preset-icons'
import tagify from 'unocss/preset-tagify'
import uno from 'unocss/preset-uno'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-col-center': 'flex flex-col items-center justify-center',
    'card-box': 'bg-card text-card-foreground border-border rounded-xl border',
  },
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
