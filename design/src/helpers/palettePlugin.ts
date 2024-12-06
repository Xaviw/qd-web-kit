import type { PluginCreator } from 'postcss'
import { join, resolve } from 'node:path'
import { cwd } from 'node:process'
import { TinyColor } from '@ctrl/tinycolor'
import { getColors } from 'theme-colors'

export interface PaletteColorName {
  /** CSS 文件路径，支持从vite.config目录开始的相对或绝对路径 */
  path: string
  /**
   * 需要匹配的选择器，未传时匹配全部选择器下的属性，多个选择器并列时传递子数组
   * @example [":root", "[data-theme='violet']", ".any-class", [".dark", ".dark[data-theme='custom']", "[data-theme='custom'] .dark"]]
   */
  selectors?: string[]
  /**
   * 需要匹配的颜色变量名，仅支持 `224 71.4% 4.1%` 格式的颜色变量，无需添加 `--` 前缀
   * @example ["primary", "secondary"]
   */
  names: string[]
}

/** postcss插件，用于扩展主题变量的-50至-950颜色 */
export const postcssPluginPalette: PluginCreator<PaletteColorName[]> = (opts = []) => {
  return {
    postcssPlugin: 'postcss-plugin-palette',

    Declaration(decl) {
      const file = decl.source?.input?.file
      if (!file) {
        return
      }

      // 找到文件对应的配置项
      const { selectors = [], names = [] } = opts.find((item) => {
        const path = join(cwd(), item.path)
        return resolve(file) === path
      }) || {}
      if (!names.length) {
        return
      }

      // 匹配选择器是否一致
      if (selectors.length) {
        const a = [...selectors]
          .sort()
          .join(',')
          .replaceAll(/`|'/, `"`)
          .replaceAll(/\s/, '')
        const declSelectors = (decl.parent as unknown as any)?.selectors() || []
        const b = [...declSelectors]
          .sort()
          .join(',')
          .replaceAll(/`|'/, `"`)
          .replaceAll(/\s/, '')
        if (a !== b) {
          return
        }
      }

      // 匹配变量名
      if (decl.prop.startsWith('--')) {
        const name = decl.prop.replace('--', '')
        // 变量值符合规范
        if (names.includes(name) && /^\s*\d+(?:\.\d+)?\s+\d+(?:\.\d+)?%\s+\d+(?:\.\d+)?%\s*(?:\/\s*\d+(?:\.\d+)?\s*)?$/.test(decl.value)) {
          // 生成调色板变量
          const variables = generatorColorVariables(name, `hsl(${decl.value})`)
          // 插入变量
          for (const key in variables) {
            decl.cloneAfter({
              prop: key,
              value: variables[key],
            })
          }
        }
      }
    },
  }
}

postcssPluginPalette.postcss = true

function generatorColorVariables(name: string, color: string) {
  const colorVariables: Record<string, string> = {}

  const colorsMap = getColors(new TinyColor(color).toHexString())

  const colorKeys = Object.keys(colorsMap)

  colorKeys.forEach((key) => {
    const colorValue = colorsMap[key]

    if (colorValue) {
      const hslColor = convertToHslCssVar(colorValue)
      colorVariables[`--${name}-${key}`] = hslColor
    }
  })

  return colorVariables
}

/** 将颜色转换为HSL CSS变量 */
function convertToHslCssVar(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl()
  const hsl = `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  return a < 1 ? `${hsl} / ${a}` : hsl
}
